import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_group_type_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_tree_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class PermissionsListState extends BaseState<List<PermissionModel>> {
  final FilterListDTO filterList;
  final List<RoleFeaturePermissionsModel>? roleFeaturePermissions;
  final List<RoleFeaturePermissionsModel>? originalRoleFeaturePermissions;
  final List<RoleFeaturePermissionsModel>? userGroupFeaturePermissions;
  final List<RoleFeaturePermissionsModel>? originalUserGroupFeaturePermissions;
  // Complete, unpaginated snapshot of every feature/permission for the
  // selected role or user group, kept in sync with edits made through the
  // (possibly paginated/search-filtered) lists above. Dependency-warning
  // checks run against these instead of the paginated lists so a dependency
  // living on an unloaded page or a different feature tab is never missed.
  final List<RoleFeaturePermissionsModel>? allRoleFeaturePermissions;
  final List<RoleFeaturePermissionsModel>? allUserGroupFeaturePermissions;
  // Pristine copy of the above, captured once when loaded and never mutated
  // by edits. Used to tell which permissions were actually toggled during
  // this editing session, as opposed to ones that were already inconsistent
  // before the admin opened the editor.
  final List<RoleFeaturePermissionsModel>? originalAllRoleFeaturePermissions;
  final List<RoleFeaturePermissionsModel>? originalAllUserGroupFeaturePermissions;
  final bool isLoadingRolePermissions;
  final bool isPaginatingRolePermissions;
  final bool hasMoreRolePermissions;
  final String rolePermissionSearch;
  final bool isLoadingUserGroupPermissions;
  final bool isPaginatingUserGroupPermissions;
  final bool hasMoreUserGroupPermissions;
  final String userGroupPermissionSearch;
  final bool isLoadingPermissionTree;
  final bool isPaginatingPermissionTree;
  final bool hasMorePermissionTree;
  final String permissionTreeSearch;
  final bool isSaving;
  final String? selectedRoleId;
  final String? selectedUserGroupId;
  final PermissionGroupType? selectedPermissionGroupType;
  final UserGroupModel? selectedPermissionGroup;
  final PermissionTreeModel? permissionTree;
  final List<PermissionDependencyWarning>? pendingRoleDependencyWarnings;
  final List<PermissionDependencyWarning>? pendingGroupDependencyWarnings;
  // Whether the Permission Assistant (structural dependency check, surfaced
  // even for permissions untouched this session) is on. Persisted per-admin
  // via SharedPreferences; hydrated at cubit construction, see
  // PermissionAssistantPreferences.
  final bool isPermissionAssistantEnabled;

  const PermissionsListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.filterList,
    this.roleFeaturePermissions,
    this.originalRoleFeaturePermissions,
    this.userGroupFeaturePermissions,
    this.originalUserGroupFeaturePermissions,
    this.allRoleFeaturePermissions,
    this.allUserGroupFeaturePermissions,
    this.originalAllRoleFeaturePermissions,
    this.originalAllUserGroupFeaturePermissions,
    this.isLoadingRolePermissions = false,
    this.isPaginatingRolePermissions = false,
    this.hasMoreRolePermissions = true,
    this.rolePermissionSearch = '',
    this.isLoadingUserGroupPermissions = false,
    this.isPaginatingUserGroupPermissions = false,
    this.hasMoreUserGroupPermissions = true,
    this.userGroupPermissionSearch = '',
    this.isLoadingPermissionTree = false,
    this.isPaginatingPermissionTree = false,
    this.hasMorePermissionTree = true,
    this.permissionTreeSearch = '',
    this.isSaving = false,
    this.selectedRoleId,
    this.selectedUserGroupId,
    this.selectedPermissionGroupType,
    this.selectedPermissionGroup,
    this.permissionTree,
    this.pendingRoleDependencyWarnings,
    this.pendingGroupDependencyWarnings,
    this.isPermissionAssistantEnabled = true,
  });

  const PermissionsListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );

  // Compares the complete (unpaginated) snapshot, not just the paginated
  // list, so a fix made to a permission outside the loaded page/search
  // result — e.g. via the dependency-resolution dialog — still counts as an
  // unsaved change instead of silently having nothing to save.
  bool get hasChanges {
    return _hasFeaturePermissionChanges(
      roleDependencyValidationPermissions,
      roleDependencyValidationOriginalPermissions,
    );
  }

  bool get hasUserGroupChanges {
    return _hasFeaturePermissionChanges(
      allUserGroupFeaturePermissions ?? userGroupFeaturePermissions,
      originalAllUserGroupFeaturePermissions ?? originalUserGroupFeaturePermissions,
    );
  }

  bool get hasSelectedGroupChanges => switch (selectedPermissionGroupType) {
    PermissionGroupType.userGroup => hasUserGroupChanges,
    null => false,
  };

  bool get isLoadingSelectedGroupPermissions => switch (selectedPermissionGroupType) {
    PermissionGroupType.userGroup => isLoadingUserGroupPermissions,
    null => false,
  };

  bool get supportsSelectedGroupPermissionSearch =>
      selectedPermissionGroupType == PermissionGroupType.userGroup;

  bool get isPaginatingSelectedGroupPermissions => switch (selectedPermissionGroupType) {
    PermissionGroupType.userGroup => isPaginatingUserGroupPermissions,
    null => false,
  };

  String get selectedGroupPermissionSearch => switch (selectedPermissionGroupType) {
    PermissionGroupType.userGroup => userGroupPermissionSearch,
    null => '',
  };

  List<RoleFeaturePermissionsModel>? get selectedGroupFeaturePermissions =>
      switch (selectedPermissionGroupType) {
        PermissionGroupType.userGroup => userGroupFeaturePermissions,
        null => null,
      };

  // Complete, page-independent permission set to run dependency-warning
  // checks against. Falls back to the paginated list if the full snapshot
  // hasn't finished loading yet (e.g. checked immediately after selecting a
  // role, before the background fetch resolves).
  List<RoleFeaturePermissionsModel>? get roleDependencyValidationPermissions =>
      allRoleFeaturePermissions ?? roleFeaturePermissions;

  List<RoleFeaturePermissionsModel>? get selectedGroupDependencyValidationPermissions =>
      switch (selectedPermissionGroupType) {
        PermissionGroupType.userGroup =>
          allUserGroupFeaturePermissions ?? userGroupFeaturePermissions,
        null => null,
      };

  // Session-start baseline paired with the getters above, used to tell which
  // permissions were actually toggled this session (see
  // `findMissingDependencyWarnings`).
  List<RoleFeaturePermissionsModel>? get roleDependencyValidationOriginalPermissions =>
      originalAllRoleFeaturePermissions ?? originalRoleFeaturePermissions;

  List<RoleFeaturePermissionsModel>? get selectedGroupDependencyValidationOriginalPermissions =>
      switch (selectedPermissionGroupType) {
        PermissionGroupType.userGroup =>
          originalAllUserGroupFeaturePermissions ?? originalUserGroupFeaturePermissions,
        null => null,
      };

  String? get selectedPermissionGroupId => switch (selectedPermissionGroupType) {
    PermissionGroupType.userGroup => selectedUserGroupId,
    null => null,
  };

  bool _hasFeaturePermissionChanges(
    List<RoleFeaturePermissionsModel>? featurePermissions,
    List<RoleFeaturePermissionsModel>? originalFeaturePermissions,
  ) {
    if (featurePermissions == null || originalFeaturePermissions == null) {
      return false;
    }
    if (featurePermissions.length != originalFeaturePermissions.length) return true;
    for (int i = 0; i < featurePermissions.length; i++) {
      if (featurePermissions[i] != originalFeaturePermissions[i]) return true;
    }
    return false;
  }

  // Built from the complete (unpaginated) snapshot rather than the paginated
  // list, so a permission fixed outside the loaded page — e.g. via the
  // dependency-resolution dialog — is actually included in the save payload
  // instead of being silently dropped.
  List<RolePermissionModel> get rolePermissions =>
      roleDependencyValidationPermissions?.expand((feature) => feature.permissionList).toList() ??
      [];

  List<RolePermissionModel> get userGroupPermissions =>
      (allUserGroupFeaturePermissions ?? userGroupFeaturePermissions)
          ?.expand((feature) => feature.permissionList)
          .toList() ??
      [];

  @override
  PermissionsListState copyWith({
    Result<List<PermissionModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    FilterListDTO? filterList,
    List<RoleFeaturePermissionsModel>? roleFeaturePermissions,
    List<RoleFeaturePermissionsModel>? originalRoleFeaturePermissions,
    List<RoleFeaturePermissionsModel>? userGroupFeaturePermissions,
    List<RoleFeaturePermissionsModel>? originalUserGroupFeaturePermissions,
    List<RoleFeaturePermissionsModel>? allRoleFeaturePermissions,
    List<RoleFeaturePermissionsModel>? allUserGroupFeaturePermissions,
    List<RoleFeaturePermissionsModel>? originalAllRoleFeaturePermissions,
    List<RoleFeaturePermissionsModel>? originalAllUserGroupFeaturePermissions,
    bool? isLoadingRolePermissions,
    bool? isPaginatingRolePermissions,
    bool? hasMoreRolePermissions,
    String? rolePermissionSearch,
    bool? isLoadingUserGroupPermissions,
    bool? isPaginatingUserGroupPermissions,
    bool? hasMoreUserGroupPermissions,
    String? userGroupPermissionSearch,
    bool? isLoadingPermissionTree,
    bool? isPaginatingPermissionTree,
    bool? hasMorePermissionTree,
    String? permissionTreeSearch,
    bool? isSaving,
    String? selectedRoleId,
    String? selectedUserGroupId,
    PermissionGroupType? selectedPermissionGroupType,
    UserGroupModel? selectedPermissionGroup,
    PermissionTreeModel? permissionTree,
    List<PermissionDependencyWarning>? pendingRoleDependencyWarnings,
    List<PermissionDependencyWarning>? pendingGroupDependencyWarnings,
    bool? isPermissionAssistantEnabled,
    bool clearUserGroupFeaturePermissions = false,
    bool clearRoleFeaturePermissions = false,
    bool clearAllRoleFeaturePermissions = false,
    bool clearAllUserGroupFeaturePermissions = false,
    bool clearSelectedPermissionGroup = false,
    bool clearPendingRoleDependencyWarnings = false,
    bool clearPendingGroupDependencyWarnings = false,
  }) {
    return PermissionsListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure,
      filterList: filterList ?? this.filterList,
      roleFeaturePermissions: clearRoleFeaturePermissions
          ? null
          : roleFeaturePermissions ?? this.roleFeaturePermissions,
      originalRoleFeaturePermissions: clearRoleFeaturePermissions
          ? null
          : originalRoleFeaturePermissions ?? this.originalRoleFeaturePermissions,
      userGroupFeaturePermissions: clearUserGroupFeaturePermissions
          ? null
          : userGroupFeaturePermissions ?? this.userGroupFeaturePermissions,
      originalUserGroupFeaturePermissions: clearUserGroupFeaturePermissions
          ? null
          : originalUserGroupFeaturePermissions ?? this.originalUserGroupFeaturePermissions,
      allRoleFeaturePermissions: clearAllRoleFeaturePermissions
          ? null
          : allRoleFeaturePermissions ?? this.allRoleFeaturePermissions,
      allUserGroupFeaturePermissions: clearAllUserGroupFeaturePermissions
          ? null
          : allUserGroupFeaturePermissions ?? this.allUserGroupFeaturePermissions,
      originalAllRoleFeaturePermissions: clearAllRoleFeaturePermissions
          ? null
          : originalAllRoleFeaturePermissions ?? this.originalAllRoleFeaturePermissions,
      originalAllUserGroupFeaturePermissions: clearAllUserGroupFeaturePermissions
          ? null
          : originalAllUserGroupFeaturePermissions ?? this.originalAllUserGroupFeaturePermissions,
      isLoadingRolePermissions: isLoadingRolePermissions ?? this.isLoadingRolePermissions,
      isPaginatingRolePermissions: isPaginatingRolePermissions ?? this.isPaginatingRolePermissions,
      hasMoreRolePermissions: hasMoreRolePermissions ?? this.hasMoreRolePermissions,
      rolePermissionSearch: rolePermissionSearch ?? this.rolePermissionSearch,
      isLoadingUserGroupPermissions:
          isLoadingUserGroupPermissions ?? this.isLoadingUserGroupPermissions,
      isPaginatingUserGroupPermissions:
          isPaginatingUserGroupPermissions ?? this.isPaginatingUserGroupPermissions,
      hasMoreUserGroupPermissions: hasMoreUserGroupPermissions ?? this.hasMoreUserGroupPermissions,
      userGroupPermissionSearch: userGroupPermissionSearch ?? this.userGroupPermissionSearch,
      isLoadingPermissionTree: isLoadingPermissionTree ?? this.isLoadingPermissionTree,
      isPaginatingPermissionTree: isPaginatingPermissionTree ?? this.isPaginatingPermissionTree,
      hasMorePermissionTree: hasMorePermissionTree ?? this.hasMorePermissionTree,
      permissionTreeSearch: permissionTreeSearch ?? this.permissionTreeSearch,
      isSaving: isSaving ?? this.isSaving,
      selectedRoleId: selectedRoleId ?? this.selectedRoleId,
      selectedUserGroupId: selectedUserGroupId ?? this.selectedUserGroupId,
      selectedPermissionGroupType: clearSelectedPermissionGroup
          ? null
          : selectedPermissionGroupType ?? this.selectedPermissionGroupType,
      selectedPermissionGroup: clearSelectedPermissionGroup
          ? null
          : selectedPermissionGroup ?? this.selectedPermissionGroup,
      permissionTree: permissionTree ?? this.permissionTree,
      pendingRoleDependencyWarnings: clearPendingRoleDependencyWarnings
          ? null
          : pendingRoleDependencyWarnings ?? this.pendingRoleDependencyWarnings,
      pendingGroupDependencyWarnings: clearPendingGroupDependencyWarnings
          ? null
          : pendingGroupDependencyWarnings ?? this.pendingGroupDependencyWarnings,
      isPermissionAssistantEnabled:
          isPermissionAssistantEnabled ?? this.isPermissionAssistantEnabled,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    filterList,
    roleFeaturePermissions,
    originalRoleFeaturePermissions,
    userGroupFeaturePermissions,
    originalUserGroupFeaturePermissions,
    allRoleFeaturePermissions,
    allUserGroupFeaturePermissions,
    originalAllRoleFeaturePermissions,
    originalAllUserGroupFeaturePermissions,
    isLoadingRolePermissions,
    isPaginatingRolePermissions,
    hasMoreRolePermissions,
    rolePermissionSearch,
    isLoadingUserGroupPermissions,
    isPaginatingUserGroupPermissions,
    hasMoreUserGroupPermissions,
    userGroupPermissionSearch,
    isLoadingPermissionTree,
    isPaginatingPermissionTree,
    hasMorePermissionTree,
    permissionTreeSearch,
    isSaving,
    selectedRoleId,
    selectedUserGroupId,
    selectedPermissionGroupType,
    selectedPermissionGroup,
    permissionTree,
    pendingRoleDependencyWarnings,
    pendingGroupDependencyWarnings,
    isPermissionAssistantEnabled,
  ];
}
