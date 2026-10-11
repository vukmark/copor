import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class ChatInfoState extends BaseState<ChatInfoModel> {
  final String? chatId;
  const ChatInfoState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.chatId,
  });

  const ChatInfoState.initial() : this._(result: null, chatId: null);
  const ChatInfoState.loading({required Result<ChatInfoModel>? result, required chatId})
    : this._(result: result, isLoading: true, chatId: chatId);
  const ChatInfoState.fetched({required Result<ChatInfoModel> result, required chatId})
    : this._(result: result, chatId: chatId);
  const ChatInfoState.failure({
    required Failure failure,
    required Result<ChatInfoModel>? result,
    required chatId,
  }) : this._(result: result, failure: failure, chatId: chatId);

  @override
  ChatInfoState copyWith({
    Result<ChatInfoModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    String? chatId,
    bool? isLoadingOlder,
  }) {
    return ChatInfoState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      chatId: chatId ?? this.chatId,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, chatId];
}
