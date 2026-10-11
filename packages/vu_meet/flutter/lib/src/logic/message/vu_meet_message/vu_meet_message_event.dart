import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_message_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/make_video_call_req_body_dto.dart';
import 'package:equatable/equatable.dart';

sealed class VuMeetMessageEvent extends Equatable {
  const VuMeetMessageEvent();

  @override
  List<Object?> get props => [];
}

class GetOlderVuMeetMessages extends VuMeetMessageEvent {
  const GetOlderVuMeetMessages();

  @override
  List<Object?> get props => [];
}

class GetNewerVuMeetMessages extends VuMeetMessageEvent {
  final String afterDate;
  final String chatId;

  const GetNewerVuMeetMessages({required this.afterDate, required this.chatId});

  @override
  List<Object?> get props => [afterDate, chatId];
}

class GetNewVuMeetMessage extends VuMeetMessageEvent {
  final String chatId;
  final bool animateFromTyping;

  const GetNewVuMeetMessage(this.chatId, {this.animateFromTyping = false});

  @override
  List<Object?> get props => [chatId, animateFromTyping];
}

class ClearJustArrivedMessage extends VuMeetMessageEvent {
  const ClearJustArrivedMessage();
}

class SelectChatForMessages extends VuMeetMessageEvent {
  final String? chatId;

  const SelectChatForMessages(this.chatId);

  @override
  List<Object?> get props => [chatId];
}

class MakeVideoCall extends VuMeetMessageEvent {
  final MakeVideoCallActionReqBodyDto requestBody;

  const MakeVideoCall(this.requestBody);

  @override
  List<Object?> get props => [requestBody];
}

class SendVuMeetMessage extends VuMeetMessageEvent {
  final SendVuMeetMessageReqBodyDto messageDto;

  const SendVuMeetMessage(this.messageDto);

  @override
  List<Object?> get props => [messageDto];
}

class ChangeTypingStatusEvent extends VuMeetMessageEvent {
  final TypingStatusReqBody body;

  const ChangeTypingStatusEvent(this.body);

  @override
  List<Object?> get props => [body];
}

class UpdateTypingStatusEvent extends VuMeetMessageEvent {
  final TypingStatusUpdateDTO model;

  const UpdateTypingStatusEvent(this.model);

  @override
  List<Object?> get props => [model];
}

class ClearVuMeetMessageFailure extends VuMeetMessageEvent {
  const ClearVuMeetMessageFailure();
}

class SendVuMeetFileMessage extends VuMeetMessageEvent {
  final SendVuMeetFileReqBodyDto messageFileDto;

  const SendVuMeetFileMessage({required this.messageFileDto});

  @override
  List<Object?> get props => [messageFileDto];
}
