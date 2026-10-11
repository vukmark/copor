import 'package:equatable/equatable.dart';

enum VuMeetStep { chatList, createChat }

class VuMeetUiState extends Equatable {
  final VuMeetStep step;

  const VuMeetUiState({this.step = VuMeetStep.chatList});

  factory VuMeetUiState.initial() => const VuMeetUiState();

  VuMeetUiState copyWith({VuMeetStep? step}) {
    return VuMeetUiState(step: step ?? this.step);
  }

  @override
  List<Object?> get props => [step];
}
