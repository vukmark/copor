import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_info/chat_info_repository.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_event.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_state.dart';

class ChatInfoBloc extends Bloc<ChatInfoEvent, ChatInfoState> {
  final ChatInfoRepository _chatInfoRepository;

  ChatInfoBloc({required ChatInfoRepository chatInfoRepository})
    : _chatInfoRepository = chatInfoRepository,
      super(ChatInfoState.initial()) {
    on<GetChatInfo>(_onGetChatInfo);
  }

  Future<void> _onGetChatInfo(GetChatInfo event, Emitter<ChatInfoState> emit) async {
    emit(state.copyWith(isLoading: true));

    final result = await _chatInfoRepository.getChatInfo(chatId: event.chatId);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, chatId: event.chatId, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, chatId: event.chatId, isLoading: false));
      },
    );
  }
}
