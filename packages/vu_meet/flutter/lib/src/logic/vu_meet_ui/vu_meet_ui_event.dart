import 'package:equatable/equatable.dart';

abstract class VuMeetUiEvent extends Equatable {
  const VuMeetUiEvent();
  @override
  List<Object?> get props => [];
}

class ShowCreateChatScreen extends VuMeetUiEvent {}

class HideCreateChatScreen extends VuMeetUiEvent {}
