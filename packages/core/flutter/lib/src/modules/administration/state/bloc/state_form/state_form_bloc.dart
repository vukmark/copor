import 'package:copor_core/src/modules/administration/state/bloc/state_form/state_form_event.dart';
import 'package:copor_core/src/modules/administration/state/bloc/state_form/state_form_state.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class StateFormBloc extends Bloc<StateFormEvent, StateFormState> {
  final StateRepository _stateRepository;

  StateFormBloc({required StateRepository stateRepository})
    : _stateRepository = stateRepository,
      super(StateFormState.initial()) {
    on<GetState>(_onGetState);
    on<GetPublicState>(_onGetPublicState);
    on<CreateState>(_onCreateState);
    on<UpdateState>(_onUpdateState);
  }

  Future<void> _onGetState(GetState event, Emitter<StateFormState> emit) async {
    emit(StateFormState.loading(result: state.result));

    final result = await _stateRepository.getState(event.stateId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onGetPublicState(GetPublicState event, Emitter<StateFormState> emit) async {
    emit(StateFormState.loading(result: state.result));

    final result = await _stateRepository.getPublicState(event.stateId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onCreateState(CreateState event, Emitter<StateFormState> emit) async {
    emit(StateFormState.loading(result: state.result));

    final result = await _stateRepository.createState(event.stateToCreate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdateState(UpdateState event, Emitter<StateFormState> emit) async {
    emit(StateFormState.loading(result: state.result));

    final result = await _stateRepository.updateState(event.stateToUpdate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.update));
      },
    );
  }
}
