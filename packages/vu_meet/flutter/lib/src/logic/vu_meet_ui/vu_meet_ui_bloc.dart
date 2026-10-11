import 'package:bloc/bloc.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_event.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_state.dart';

class VuMeetUiBloc extends Bloc<VuMeetUiEvent, VuMeetUiState> {
  VuMeetUiBloc() : super(VuMeetUiState.initial()) {
    on<ShowCreateChatScreen>(_onShowCreateChat);
    on<HideCreateChatScreen>(_onHideCreateChat);
  }

  void _onShowCreateChat(ShowCreateChatScreen event, Emitter<VuMeetUiState> emit) {
    emit(state.copyWith(step: VuMeetStep.createChat));
  }

  void _onHideCreateChat(HideCreateChatScreen event, Emitter<VuMeetUiState> emit) {
    emit(state.copyWith(step: VuMeetStep.chatList));
  }
}
