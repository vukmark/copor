import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_user_model.dart';

final class UserGroupsState extends BaseState<List<UserGroupModel>> with DeletableState {
  @override
  final bool isDeleted;
  final List<UserGroupUserModel> userList;
  final bool isLoadingUserList;
  final bool isPaginatingUserList;
  final bool hasMoreUserList;
  final String? selectedUserGroupId;

  const UserGroupsState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
    this.userList = const [],
    this.isLoadingUserList = false,
    this.isPaginatingUserList = false,
    this.hasMoreUserList = true,
    this.selectedUserGroupId,
  });

  const UserGroupsState.initial() : this._(result: null);

  @override
  UserGroupsState copyWith({
    Result<List<UserGroupModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool? isDeleted,
    List<UserGroupUserModel>? userList,
    bool? isLoadingUserList,
    bool? isPaginatingUserList,
    bool? hasMoreUserList,
    String? selectedUserGroupId,
  }) {
    return UserGroupsState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure,
      isDeleted: isDeleted ?? this.isDeleted,
      userList: userList ?? this.userList,
      isLoadingUserList: isLoadingUserList ?? this.isLoadingUserList,
      isPaginatingUserList: isPaginatingUserList ?? this.isPaginatingUserList,
      hasMoreUserList: hasMoreUserList ?? this.hasMoreUserList,
      selectedUserGroupId: selectedUserGroupId ?? this.selectedUserGroupId,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    isDeleted,
    userList,
    isLoadingUserList,
    isPaginatingUserList,
    hasMoreUserList,
    selectedUserGroupId,
  ];
}
