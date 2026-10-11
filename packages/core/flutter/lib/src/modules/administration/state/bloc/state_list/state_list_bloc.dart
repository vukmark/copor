// lib/src/modules/administration/state/bloc/state_list/state_list_bloc.dart

import 'package:copor_core/src/modules/administration/state/bloc/state_list/state_list_event.dart';
import 'package:copor_core/src/modules/administration/state/bloc/state_list/state_list_state.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class StateListBloc extends Bloc<StateListEvent, StateListState> {
  final StateRepository _stateRepository;

  StateListBloc({required StateRepository stateRepository})
    : _stateRepository = stateRepository,
      super(StateListState.initial()) {
    on<GetStateList>(_onGetStateList);
    on<DeleteState>(_onDeleteState);
    on<GetPublicStateByCountry>(_onGetPublicStateByCountry);
    on<GetStateListByCountry>(_onGetStateListByCountry);
  }

  Future<void> _onGetStateList(GetStateList event, Emitter<StateListState> emit) async {
    emit(StateListState.loading(result: state.result));

    final result = await _stateRepository.getStateList();
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onDeleteState(DeleteState event, Emitter<StateListState> emit) async {
    emit(StateListState.loading(result: state.result));

    final result = await _stateRepository.deleteState(event.stateId);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isLoading: false, isDeleted: true));
        add(GetStateList());
      },
    );
  }

  Future<void> _onGetPublicStateByCountry(
    GetPublicStateByCountry event,
    Emitter<StateListState> emit,
  ) async {
    emit(StateListState.loading(result: state.result));

    final result = await _stateRepository.getPublicStateListByCountry(event.countryId);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false, result: null));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onGetStateListByCountry(
    GetStateListByCountry event,
    Emitter<StateListState> emit,
  ) async {
    emit(StateListState.loading(result: state.result));

    final result = await _stateRepository.getStateListByCountry(event.countryId);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false, result: null));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }
}
