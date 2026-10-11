import 'package:copor_vu_meet/src/data/model/chat_list/create_new_chat_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/edit_chat_req_body_dto.dart';
import 'package:equatable/equatable.dart';

sealed class ChatListEvent extends Equatable {
  const ChatListEvent();

  @override
  List<Object?> get props => [];
}

class GetChatList extends ChatListEvent {
  final String filterByName;
  final String emitNewChatIdCreated;
  final bool showLoading;

  const GetChatList({
    required this.filterByName,
    this.emitNewChatIdCreated = '',
    this.showLoading = true,
  });
}

class ResetChatList extends ChatListEvent {
  const ResetChatList();
}

class CreateChat extends ChatListEvent {
  final CreateNewChatReqBodyDto users;

  const CreateChat({required this.users});

  @override
  List<Object> get props => [users];
}

class EditChat extends ChatListEvent {
  final EditChatReqBodyDto body;

  const EditChat({required this.body});

  @override
  List<Object> get props => [body];
}

class MemberRemovedFromGroup extends ChatListEvent {
  final String chatId;
  final String chatName;

  const MemberRemovedFromGroup({required this.chatId, required this.chatName});

  @override
  List<Object> get props => [chatId, chatName];
}

class UpdateChatListTypingStatus extends ChatListEvent {
  final String chatId;
  final String userName;
  final bool isTyping;

  const UpdateChatListTypingStatus({
    required this.chatId,
    required this.userName,
    required this.isTyping,
  });

  @override
  List<Object> get props => [chatId, userName, isTyping];
}
