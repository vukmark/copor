import 'package:equatable/equatable.dart';

abstract class CallEvent extends Equatable {
  const CallEvent();

  @override
  List<Object> get props => [];
}

class CallStartOngoing extends CallEvent {
  final String chatId;
  final bool isVideo;

  const CallStartOngoing({required this.chatId, required this.isVideo});

  @override
  List<Object> get props => [chatId, isVideo];
}

class CallCancelled extends CallEvent {
  // How long the call actually lasted, so it can be reported to the backend
  // and relayed to the other participant instead of them timing their own
  // teardown independently (which lags behind and shows a different duration).
  final Duration? duration;

  const CallCancelled({this.duration});

  @override
  List<Object> get props => duration != null ? [duration!] : [];
}

class CallAnsweredReceived extends CallEvent {}

class CallAnswered extends CallEvent {
  final String chatId;
  final bool isVideo;
  const CallAnswered({required this.chatId, required this.isVideo});

  @override
  List<Object> get props => [chatId, isVideo];
}

class CallDeclinedReceived extends CallEvent {
  final String? declinerName;

  const CallDeclinedReceived({this.declinerName});

  @override
  List<Object> get props => declinerName != null ? [declinerName!] : [];
}

class CallDeclined extends CallEvent {
  final String chatId;
  final int numberOfDeclinedCalls;

  const CallDeclined({required this.chatId, required this.numberOfDeclinedCalls});

  @override
  List<Object> get props => [chatId, numberOfDeclinedCalls];
}

class CallTimedOut extends CallEvent {
  // True when the caller actively cancelled while still ringing, as opposed to
  // the ring timer naturally expiring. The backend signal is the same either
  // way (the recipient missed the call regardless of why), but the caller's
  // own screen shouldn't claim "didn't answer" for something the caller did.
  final bool isManualCancel;

  const CallTimedOut({this.isManualCancel = false});

  @override
  List<Object> get props => [isManualCancel];
}

class CallReset extends CallEvent {}
