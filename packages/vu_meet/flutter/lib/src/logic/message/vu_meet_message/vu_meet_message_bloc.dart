import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/utils/notification_counter_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';
import 'package:copor_vu_meet/src/data/repository_impl/vu_meet_message/vu_meet_message_repository.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_event.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_core/src/utils/message_data.dart';
import 'vu_meet_message_event.dart';
import 'vu_meet_message_state.dart';

class VuMeetMessageBloc extends Bloc<VuMeetMessageEvent, VuMeetMessageState> {
  final VuMeetMessageRepository _vuMeetMessageRepository;
  late final StreamSubscription<WebSocketState> _webSocketSubscription;

  VuMeetMessageBloc({required VuMeetMessageRepository vuMeetMessageRepository})
    : _vuMeetMessageRepository = vuMeetMessageRepository,
      super(VuMeetMessageState.initial()) {
    on<SelectChatForMessages>(_onSelectChatForMessages, transformer: restartable());
    on<GetOlderVuMeetMessages>(_onGetOlderMessages);
    on<GetNewVuMeetMessage>(_onGetNewMessage, transformer: restartable());
    on<SendVuMeetMessage>(_onSendMessage);
    on<SendVuMeetFileMessage>(_onSendFileMessage);
    on<ClearVuMeetMessageFailure>(_onClearFailure);
    on<ChangeTypingStatusEvent>(_onChangeTypingStatusEvent);
    on<UpdateTypingStatusEvent>(_onUpdateTypingStatusEvent);
    on<ClearJustArrivedMessage>(_onClearJustArrivedMessage);

    _webSocketSubscription = getIt<WebSocketBloc>().stream.listen(_onWebSocketMessage);
  }

  void _onWebSocketMessage(WebSocketState wsState) {
    if (wsState is! WebSocketMessageReceived) return;
    final eventType = wsState.message.event;
    final payload = wsState.message.payload;

    if (eventType == 'NEW_MESSAGE_NOTIFICATION') {
      _handleNewMessageNotification(payload);
      return;
    }

    if (eventType == 'TYPING_STATUS') {
      _handleTypingStatus(payload);
    }
  }

  void _handleNewMessageNotification(Map<String, dynamic> payload) {
    final message = MessageData.tryFromJson(payload);
    if (message == null) return;

    final selectedChatId = getIt<SelectedChatCubit>().state;
    if (state.chatId == message.lastMessageChatId && selectedChatId == state.chatId) {
      final wasTyping =
          state.typingStatusModel?.chatId == message.lastMessageChatId &&
          state.typingStatusModel?.isTyping == true;
      add(GetNewVuMeetMessage(message.lastMessageChatId, animateFromTyping: wasTyping));
    }
  }

  void _handleTypingStatus(Map<String, dynamic> payload) {
    final chatId = payload['chatId'];
    final typingStatus = payload['typingStatus'];
    final userName = payload['userName'];

    if (chatId is! String || typingStatus is! String || userName is! String) return;

    add(
      UpdateTypingStatusEvent(
        TypingStatusUpdateDTO(
          chatId: chatId,
          isTyping: typingStatus == 'STARTED_TYPING',
          userName: userName,
        ),
      ),
    );
  }

  Future<void> _onSelectChatForMessages(
    SelectChatForMessages event,
    Emitter<VuMeetMessageState> emit,
  ) async {
    final chatId = event.chatId;
    emit(VuMeetMessageState.initial());
    if (event.chatId == null) {
      return;
    }
    emit(VuMeetMessageState.loading(result: state.result, chatId: chatId));

    final result = await _vuMeetMessageRepository.getVuMeetMessage(chatId: event.chatId!);
    if (state.chatId != chatId) return;

    result.fold(
      (failure) {
        emit(state.copyWith(isLoading: false, failure: failure));
      },
      (success) {
        emit(state.copyWith(isLoading: false, isLoadingOlder: false, result: success));
        if (getIt<SelectedChatCubit>().state == chatId) {
          unawaited(_markChatSeenAndRefresh(chatId!));
        }
      },
    );
  }

  Future<void> _markChatSeenAndRefresh(String chatId) async {
    final result = await _vuMeetMessageRepository.markChatSeen(chatId);
    result.fold((_) {}, (_) {
      getIt<AppScaffoldCubit>().removeInboxCluster(chatId);
      NotificationCounterDispatcher.notificationCounter.getNotificationsCount();
      getIt<ChatListBloc>().add(const GetChatList(filterByName: '', showLoading: false));
    });
  }

  Future<void> _onGetOlderMessages(
    GetOlderVuMeetMessages event,
    Emitter<VuMeetMessageState> emit,
  ) async {
    final chatId = state.chatId;
    final messages = state.result?.data;
    if (chatId == null || messages == null || messages.isEmpty || state.isLoadingOlder) return;

    emit(state.copyWith(isLoadingOlder: true));

    final result = await _vuMeetMessageRepository.getVuMeetMessage(
      chatId: chatId,
      beforeDate: messages.last.createdAt,
    );
    if (state.chatId != chatId) return;

    result.fold(
      (failure) {
        emit(state.copyWith(isLoadingOlder: false, failure: failure));
      },
      (success) {
        final existingMessages = state.result?.data ?? [];
        final olderMessages = success.data;
        final combinedMessages = [...existingMessages, ...olderMessages];
        final updatedResult = success.copyWith(data: combinedMessages);

        emit(state.copyWith(isLoading: false, isLoadingOlder: false, result: updatedResult));
      },
    );
  }

  Future<void> _onGetNewMessage(GetNewVuMeetMessage event, Emitter<VuMeetMessageState> emit) async {
    if (state.chatId != event.chatId) return;
    final result = await _vuMeetMessageRepository.getVuMeetMessage(chatId: event.chatId);
    if (state.chatId != event.chatId) return;

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure));
      },
      (success) {
        final newestId = success.data.isNotEmpty ? success.data.first.id : null;
        final shouldAnimate = event.animateFromTyping && newestId != null;

        emit(
          state.copyWith(
            result: success,
            clearTypingStatus: shouldAnimate,
            justArrivedMessageId: shouldAnimate ? newestId : null,
          ),
        );
        NotificationCounterDispatcher.notificationCounter.getNotificationsCount();
        getIt<ChatListBloc>().add(const GetChatList(filterByName: '', showLoading: false));
      },
    );
  }

  Future<void> _onClearJustArrivedMessage(
    ClearJustArrivedMessage event,
    Emitter<VuMeetMessageState> emit,
  ) async {
    emit(state.copyWith(clearJustArrivedMessageId: true));
  }

  Future<void> _onSendMessage(SendVuMeetMessage event, Emitter<VuMeetMessageState> emit) async {
    final dto = event.messageDto;

    final optimisticMessage = VuMeetMessageItemModel(
      id: '',
      messageContent: dto.content,
      createdAt: '',
      senderName: '',
      dateCreated: '',
      senderId: '',
      isSending: true,
      isLastFromUser: true,
      isFirstFromUser: false,
      isOwn: true,
      isSeen: false,
      senderPicture: '',
      timeCreated: 'now',
    );
    final newMessagesList = [optimisticMessage, ...state.result!.data];
    final newResult = state.result!.copyWith(data: newMessagesList);

    emit(state.copyWith(result: newResult));
    final result = await _vuMeetMessageRepository.sendMessage(event.messageDto);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure));
      },
      (success) {
        add(GetNewVuMeetMessage(event.messageDto.chatId));
      },
    );
  }

  Future<void> _onSendFileMessage(
    SendVuMeetFileMessage event,
    Emitter<VuMeetMessageState> emit,
  ) async {
    final result = await _vuMeetMessageRepository.sendFileMessage(event.messageFileDto);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure));
      },
      (success) {
        add(GetNewVuMeetMessage(event.messageFileDto.chatId));
      },
    );
  }

  void _onClearFailure(ClearVuMeetMessageFailure event, Emitter<VuMeetMessageState> emit) {
    emit(state.copyWith(clearFailure: true));
  }

  Future<void> _onChangeTypingStatusEvent(
    ChangeTypingStatusEvent event,
    Emitter<VuMeetMessageState> emit,
  ) async {
    _vuMeetMessageRepository.changeTypingStatus(event.body);
  }

  Future<void> _onUpdateTypingStatusEvent(
    UpdateTypingStatusEvent event,
    Emitter<VuMeetMessageState> emit,
  ) async {
    emit(state.copyWith(typingStatusModel: event.model));
  }

  @override
  Future<void> close() {
    _webSocketSubscription.cancel();
    return super.close();
  }
}
