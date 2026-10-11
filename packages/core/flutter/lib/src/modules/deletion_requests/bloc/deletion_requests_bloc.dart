import 'dart:async';

import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_event.dart';
import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_state.dart';
import 'package:copor_core/src/modules/deletion_requests/data/repository/deletion_requests_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DeletionRequestsBloc extends Bloc<DeletionRequestsEvent, DeletionRequestsState> {
  final DeletionRequestsRepository _deletionRequestsRepository;

  DeletionRequestsBloc({required DeletionRequestsRepository deletionRequestsRepository})
    : _deletionRequestsRepository = deletionRequestsRepository,
      super(const DeletionRequestsState.initial()) {
    on<RequestAccountDeletion>(_onRequestAccountDeletion);
    on<CancelAccountDeletion>(_onCancelAccountDeletion);
  }

  Future<void> _onRequestAccountDeletion(
    RequestAccountDeletion event,
    Emitter<DeletionRequestsState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, failure: null));

    final result = await _deletionRequestsRepository.requestAccountDeletion();

    result.fold(
      (failure) {
        emit(state.copyWith(isLoading: false, isUpdated: false, failure: failure));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false, isUpdated: true, failure: null));
      },
    );
  }

  Future<void> _onCancelAccountDeletion(
    CancelAccountDeletion event,
    Emitter<DeletionRequestsState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, failure: null));

    final result = await _deletionRequestsRepository.cancelAccountDeletion();

    result.fold(
      (failure) {
        emit(state.copyWith(isLoading: false, isUpdated: false, failure: failure));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false, isUpdated: true, failure: null));
      },
    );
  }
}
