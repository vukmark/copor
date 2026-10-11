import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/administration/role/bloc/role_form/role_form_event.dart';
import 'package:copor_core/src/modules/administration/role/bloc/role_form/role_form_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

import '../../data/repository/role_repository.dart';

class RoleFormBloc extends Bloc<RoleFormEvent, RoleFormState> {
  final RoleRepository _roleRepository;

  RoleFormBloc({required RoleRepository roleRepository})
    : _roleRepository = roleRepository,
      super(RoleFormState.initial()) {
    on<GetRole>(_onGetRole);
    on<CreateRole>(_onCreateRole);
    on<UpdateRole>(_onUpdateRole);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });

    on<SaveButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetRole(GetRole event, Emitter<RoleFormState> emit) async {
    emit(RoleFormState.loading(result: state.result));

    final result = await _roleRepository.getRole(event.roleId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onCreateRole(CreateRole event, Emitter<RoleFormState> emit) async {
    emit(RoleFormState.loading(result: state.result));

    final result = await _roleRepository.createRole(event.roleToCreate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isLoading: false, isUpdated: true, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdateRole(UpdateRole event, Emitter<RoleFormState> emit) async {
    emit(RoleFormState.loading(result: state.result));

    final result = await _roleRepository.updateRole(event.roleToUpdate);

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
