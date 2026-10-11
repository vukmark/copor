import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_event.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_state.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserListBloc extends Bloc<UserListEvent, UserListState> {
  final UserRepository _userRepository;

  UserListBloc({required UserRepository userRepository})
    : _userRepository = userRepository,
      super(UserListState.initial()) {
    on<GetUserList>(_onGetUserList);
    on<DeleteUser>(_onDeleteUser);
    on<GetUserSearchList>(_onGetUserSearchList);
  }

  Future<void> _onGetUserList(GetUserList event, Emitter<UserListState> emit) async {
    emit(UserListState.loading(result: state.result, filterList: event.filterList));

    final result = await _userRepository.getUserList(event.filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onDeleteUser(DeleteUser event, Emitter<UserListState> emit) async {
    emit(UserListState.loading(result: state.result));

    final result = await _userRepository.deleteUser(event.userId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isLoading: false, isDeleted: true));
      },
    );
  }

  Future<void> _onGetUserSearchList(GetUserSearchList event, Emitter<UserListState> emit) async {
    emit(UserListState.loading(result: state.result, filterList: event.filterList));

    final result = await _userRepository.getUserSearchList(event.filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }
}
