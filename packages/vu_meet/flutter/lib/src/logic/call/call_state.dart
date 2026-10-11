import 'package:equatable/equatable.dart';

abstract class CallState extends Equatable {
  const CallState();

  @override
  List<Object> get props => [];
}

class CallInitial extends CallState {}

class CallOutgoing extends CallState {
  final String callId;
  final String calleeName;
  final String calleeAvatarUrl;
  final bool isVideo;

  const CallOutgoing({
    required this.callId,
    required this.calleeName,
    required this.calleeAvatarUrl,
    required this.isVideo,
  });

  @override
  List<Object> get props => [callId, calleeName, calleeAvatarUrl, isVideo];
}

class CallConnected extends CallState {
  final String chatId;
  final DateTime connectedAt;
  final bool isVideo;

  const CallConnected({required this.chatId, required this.connectedAt, required this.isVideo});

  @override
  List<Object> get props => [chatId, connectedAt, isVideo];
}

class CallFinished extends CallState {
  final String reason;
  final bool declinedByOther;
  final bool noAnswer;

  const CallFinished({required this.reason, this.declinedByOther = false, this.noAnswer = false});

  @override
  List<Object> get props => [reason, declinedByOther, noAnswer];
}

class CallFailure extends CallState {
  final String message;

  const CallFailure({required this.message});

  @override
  List<Object> get props => [message];
}
