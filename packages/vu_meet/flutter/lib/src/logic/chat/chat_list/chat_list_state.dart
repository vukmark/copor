import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class ChatListState extends BaseState<List<ChatListItemModel>> {
  final String filterByName;
  final Map<String, String> typingByChatId;
  const ChatListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.filterByName,
    this.typingByChatId = const {},
  });

  const ChatListState.initial() : this._(result: null, filterByName: '');
  const ChatListState.loading({
    required Result<List<ChatListItemModel>>? result,
    required String filterByName,
  }) : this._(result: result, isLoading: true, filterByName: filterByName);
  const ChatListState.fetched({
    required Result<List<ChatListItemModel>>? result,
    required String filterByName,
  }) : this._(result: result, filterByName: filterByName);
  const ChatListState.failure({
    required Failure failure,
    required Result<List<ChatListItemModel>>? result,
    required String filterByName,
  }) : this._(result: result, failure: failure, filterByName: filterByName);

  @override
  ChatListState copyWith({
    Result<List<ChatListItemModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    String? filterByName,
    Map<String, String>? typingByChatId,
  }) {
    return ChatListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      filterByName: filterByName ?? this.filterByName,
      typingByChatId: typingByChatId ?? this.typingByChatId,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, filterByName, typingByChatId];
}

final class ChatCreationSuccessState extends ChatListState {
  final String newChatId;

  const ChatCreationSuccessState({
    required this.newChatId,
    required super.result,
    required super.filterByName,
  }) : super._(isLoading: false);

  @override
  List<Object?> get props => super.props..add(newChatId);
}

final class RemovedFromGroupChatState extends ChatListState {
  final String chatId;
  final String chatName;

  const RemovedFromGroupChatState({
    required this.chatId,
    required this.chatName,
    required super.result,
    required super.filterByName,
  }) : super._(isLoading: false);

  @override
  List<Object?> get props => super.props..addAll([chatId, chatName]);
}

class ChatListResult {
  ChatListItemModel chatListModel;
  Failure? warning;
  ChatListResult({required this.chatListModel, this.warning});
}

class ChatListOperationSuccess {
  ChatListItemModel? chatListModel;
  Failure? warning;
  ChatListOperationSuccess({this.chatListModel, this.warning});
}
