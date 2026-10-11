import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/administration/role/bloc/role_list/role_list_event.dart';
import 'package:copor_core/src/modules/administration/role/bloc/role_list/role_list_state.dart';

import '../../data/repository/role_repository.dart';

class RoleListBloc extends Bloc<RoleListEvent, RoleListState> {
  final RoleRepository _roleRepository;

  RoleListBloc({required RoleRepository roleRepository})
    : _roleRepository = roleRepository,
      super(RoleListState.initial()) {
    on<GetRoleList>(_onGetRoleList);
    on<DeleteRole>(_onDeleteRole);
  }

  Future<void> _onGetRoleList(GetRoleList event, Emitter<RoleListState> emit) async {
    emit(state.copyWith(isLoading: true, isDeleted: false, filterList: event.filterList));

    final result = await _roleRepository.getRoleList(event.filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onDeleteRole(DeleteRole event, Emitter<RoleListState> emit) async {
    emit(state.copyWith(isLoading: true));

    final result = await _roleRepository.deleteRole(event.roleId);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isLoading: false, isDeleted: true));
        //add(GetRoleList());
      },
    );
  }
}
