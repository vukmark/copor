import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/connectivity_cubit/connectivity_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/utils/notification_counter_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_list/chat_list_repository.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_core/src/utils/message_data.dart';
import 'package:stream_transform/stream_transform.dart';
import 'chat_list_event.dart';
import 'chat_list_state.dart';

EventTransformer<E> _debounceRestartable<E>(Duration duration) {
  return (events, mapper) {
    return restartable<E>().call(events.debounce(duration), mapper);
  };
}

class ChatListBloc extends Bloc<ChatListEvent, ChatListState> {
  final ChatListRepository _chatListRepository;
  late final StreamSubscription<WebSocketState> _webSocketSubscription;
  late final StreamSubscription<bool> _connectivitySubscription;

  ChatListBloc({required ChatListRepository chatListRepository})
    : _chatListRepository = chatListRepository,
      super(ChatListState.initial()) {
    on<GetChatList>(
      _onGetChatList,
      transformer: _debounceRestartable(const Duration(milliseconds: 500)),
    );
    on<ResetChatList>(_onResetChatList);
    on<CreateChat>(_onCreateChat);
    on<EditChat>(_onEditChat);
    on<MemberRemovedFromGroup>(_onMemberRemovedFromGroup);
    on<UpdateChatListTypingStatus>(_onUpdateChatListTypingStatus);

    _webSocketSubscription = getIt<WebSocketBloc>().stream.listen(_onWebSocketMessage);

    bool wasConnected = getIt<ConnectivityCubit>().state;
    _connectivitySubscription = getIt<ConnectivityCubit>().stream.listen((isConnected) {
      if (isConnected && !wasConnected) {
        add(GetChatList(filterByName: state.filterByName, showLoading: false));
      }
      wasConnected = isConnected;
    });
  }

  void _onWebSocketMessage(WebSocketState wsState) {
    // This eager app-level bloc owns list refreshes and foreground socket notifications.
    if (wsState is WebSocketConnected) {
      add(GetChatList(filterByName: state.filterByName, showLoading: false));
      return;
    }
    if (wsState is! WebSocketMessageReceived) return;
    final eventType = wsState.message.event;

    if (eventType == 'CHAT_LIST_UPDATED') {
      add(GetChatList(filterByName: state.filterByName, showLoading: false));
      return;
    }

    if (eventType == 'REMOVED_FROM_GROUP_CHAT') {
      final chatId = wsState.message.payload['chatId'];
      final chatName = wsState.message.payload['chatName'];
      if (chatId is! String || chatName is! String) return;

      add(MemberRemovedFromGroup(chatId: chatId, chatName: chatName));
      return;
    }

    // Lets another of this user's devices refresh its unread badge live (e.g. this
    // device just marked a chat seen) instead of waiting for its own next poll/action.
    if (eventType == 'NUMBER_OF_UNREAD_MESSAGES') {
      NotificationCounterDispatcher.notificationCounter.getNotificationsCount();
      return;
    }

    if (eventType == 'TYPING_STATUS') {
      final chatId = wsState.message.payload['chatId'];
      final typingStatus = wsState.message.payload['typingStatus'];
      final userName = wsState.message.payload['userName'];
      if (chatId is! String || typingStatus is! String || userName is! String) {
        return;
      }

      add(
        UpdateChatListTypingStatus(
          chatId: chatId,
          userName: userName,
          isTyping: typingStatus == 'STARTED_TYPING',
        ),
      );
      return;
    }

    if (eventType != 'NEW_MESSAGE_NOTIFICATION') return;

    final message = MessageData.tryFromJson(wsState.message.payload);
    if (message == null) return;
    final activeChatId = getIt<SelectedChatCubit>().state;

    if (activeChatId == message.lastMessageChatId) return;

    add(GetChatList(filterByName: state.filterByName, showLoading: false));
    final notification = message.toDSNotification();
    final scaffoldCubit = getIt<AppScaffoldCubit>();
    scaffoldCubit.addNotification(notification);
    scaffoldCubit.addToInbox(notification);
    scaffoldCubit.incrementBadgeCount(NotificationDestinations.bell.key);
    NotificationCounterDispatcher.notificationCounter.getNotificationsCount();
  }

  Future<void> _onGetChatList(GetChatList event, Emitter<ChatListState> emit) async {
    if (event.showLoading) {
      emit(ChatListState.loading(result: state.result, filterByName: event.filterByName));
    }

    final result = await _chatListRepository.getChatList(event.filterByName);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        if (event.filterByName.isEmpty) {
          final unseenMessageCount = success.data.fold<int>(
            0,
            (total, chat) => total + chat.numberOfUnseenMessages,
          );
          getIt<AppScaffoldCubit>().setBadgeCount(
            NotificationDestinations.vuMeet.key,
            unseenMessageCount,
          );
        }
        emit(state.copyWith(result: success, isLoading: false));
        if (event.emitNewChatIdCreated != '') {
          emit(
            ChatCreationSuccessState(
              newChatId: event.emitNewChatIdCreated,
              result: state.result,
              filterByName: state.filterByName,
            ),
          );
        }
      },
    );
  }

  void _onResetChatList(ResetChatList event, Emitter<ChatListState> emit) {
    emit(ChatListState.initial());
  }

  Future<void> _onCreateChat(CreateChat event, Emitter<ChatListState> emit) async {
    emit(ChatListState.loading(result: state.result, filterByName: state.filterByName));

    final result = await _chatListRepository.getNewChatId(event.users);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure));
      },
      (chatId) {
        emit(
          ChatCreationSuccessState(
            newChatId: chatId.data,
            result: state.result,
            filterByName: state.filterByName,
          ),
        );
        add(GetChatList(filterByName: state.filterByName, showLoading: false));
      },
    );
  }

  Future<void> _onEditChat(EditChat event, Emitter<ChatListState> emit) async {
    emit(ChatListState.loading(result: state.result, filterByName: state.filterByName));

    final result = await _chatListRepository.editChat(event.body);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure));
      },
      (chatId) {
        VuMeetDispatcher.chatInfo.getChatInfo(event.body.id);
        add(GetChatList(filterByName: state.filterByName, emitNewChatIdCreated: chatId.data));
      },
    );
  }

  Future<void> _onMemberRemovedFromGroup(
    MemberRemovedFromGroup event,
    Emitter<ChatListState> emit,
  ) async {
    final result = await _chatListRepository.getChatList(state.filterByName);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(
          RemovedFromGroupChatState(
            chatId: event.chatId,
            chatName: event.chatName,
            result: success,
            filterByName: state.filterByName,
          ),
        );
      },
    );
  }

  void _onUpdateChatListTypingStatus(
    UpdateChatListTypingStatus event,
    Emitter<ChatListState> emit,
  ) {
    final updated = Map<String, String>.of(state.typingByChatId);
    if (event.isTyping) {
      updated[event.chatId] = event.userName;
    } else {
      updated.remove(event.chatId);
    }
    emit(state.copyWith(typingByChatId: updated));
  }

  @override
  Future<void> close() {
    _webSocketSubscription.cancel();
    _connectivitySubscription.cancel();
    return super.close();
  }
}
