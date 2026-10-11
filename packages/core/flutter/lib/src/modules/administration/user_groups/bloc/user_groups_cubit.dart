import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_state.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_request.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/repository/user_groups_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserGroupsCubit extends Cubit<UserGroupsState> {
  static const int _userListPageSize = 20;

  final UserGroupsRepository _userGroupsRepository;

  UserGroupsCubit({required UserGroupsRepository userGroupsRepository})
    : _userGroupsRepository = userGroupsRepository,
      super(const UserGroupsState.initial());

  Future<void> getUserGroupTree() async {
    emit(state.copyWith(isLoading: true, isDeleted: false));

    final result = await _userGroupsRepository.getUserGroupTree();
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> deleteUserGroup(String userGroupId) async {
    emit(state.copyWith(isLoading: true, isDeleted: false));

    final result = await _userGroupsRepository.deleteUserGroup(userGroupId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isLoading: false, isDeleted: true));
      },
    );
  }

  Future<void> getUserGroupUsers(String userGroupId) async {
    emit(
      state.copyWith(
        isLoadingUserList: true,
        isPaginatingUserList: false,
        hasMoreUserList: true,
        selectedUserGroupId: userGroupId,
        userList: const [],
      ),
    );

    final request = UserGroupUsersRequest(
      userGroupId: userGroupId,
      limit: _userListPageSize,
      offset: 0,
    );
    final result = await _userGroupsRepository.getUserGroupUsers(request);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoadingUserList: false));
      },
      (success) {
        final users = success.data.items;
        emit(
          state.copyWith(
            userList: users,
            isLoadingUserList: false,
            hasMoreUserList: users.length >= _userListPageSize,
          ),
        );
      },
    );
  }

  Future<void> loadMoreUserGroupUsers() async {
    final userGroupId = state.selectedUserGroupId;

    if (userGroupId == null) return;
    if (state.isLoadingUserList || state.isPaginatingUserList || !state.hasMoreUserList) return;

    emit(state.copyWith(isPaginatingUserList: true));

    final request = UserGroupUsersRequest(
      userGroupId: userGroupId,
      limit: _userListPageSize,
      offset: state.userList.length,
    );
    final result = await _userGroupsRepository.getUserGroupUsers(request);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isPaginatingUserList: false));
      },
      (success) {
        final nextUsers = success.data.items;
        emit(
          state.copyWith(
            userList: [...state.userList, ...nextUsers],
            isPaginatingUserList: false,
            hasMoreUserList: nextUsers.length >= _userListPageSize,
          ),
        );
      },
    );
  }
}
