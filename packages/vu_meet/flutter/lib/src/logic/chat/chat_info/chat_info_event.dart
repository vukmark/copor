import 'package:equatable/equatable.dart';

sealed class ChatInfoEvent extends Equatable {
  const ChatInfoEvent();

  @override
  List<Object?> get props => [];
}

class GetChatInfo extends ChatInfoEvent {
  final String chatId;
  const GetChatInfo(this.chatId);

  @override
  List<Object?> get props => [chatId];
}
