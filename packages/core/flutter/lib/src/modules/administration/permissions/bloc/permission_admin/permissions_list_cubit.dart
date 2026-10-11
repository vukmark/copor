import 'dart:async';

import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_bloc.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_event.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../../config/dependency_injection.dart';
import '../../data/model/permission_effect_enum.dart';
import '../../data/model/permission_group_type_enum.dart';
import '../../data/model/permission_scope_enum.dart';
import '../../data/model/permission_tree_model.dart';
import '../../data/model/role_permission_model.dart';
import '../../data/model/role_permission_search_response.dart';
import '../../data/repository/permissions_repository.dart';
import '../../utils/permission_assistant_preferences.dart';
import '../../utils/permission_dependency_warnings.dart';

enum _PermissionTarget { role, userGroup }

class PermissionsListCubit extends Cubit<PermissionsListState> {
  static const int _permissionPageSize = 20;

  final PermissionsRepository _permissionsRepository;
  final SharedPreferences _sharedPreferences;
  int _rolePermissionRequestId = 0;
  int _userGroupPermissionRequestId = 0;
  int _permissionTreeRequestId = 0;

  PermissionsListCubit({
    required PermissionsRepository permissionsRepository,
    required SharedPreferences sharedPreferences,
  }) : _permissionsRepository = permissionsRepository,
       _sharedPreferences = sharedPreferences,
       super(
         PermissionsListState.initial().copyWith(
           isPermissionAssistantEnabled:
               sharedPreferences.getBool(PermissionAssistantPreferences.enabledKey) ?? true,
         ),
       );

  Future<void> togglePermissionAssistant() async {
    final previousValue = state.isPermissionAssistantEnabled;
    final enabled = !previousValue;
    emit(state.copyWith(isPermissionAssistantEnabled: enabled));

    final wasSaved = await _sharedPreferences.setBool(
      PermissionAssistantPreferences.enabledKey,
      enabled,
    );
    if (!wasSaved) {
      emit(state.copyWith(isPermissionAssistantEnabled: previousValue));
    }
  }

  Future<void> getPermissionList() async {
    FilterListDTO filterList = const FilterListDTO(
      filterList: [
        FilterModelDTO(name: 'SEARCH', values: ['']),
        FilterModelDTO(name: 'SORT_BY_NAME', values: ['desc']),
      ],
      offset: '',
      limit: '',
    );

    emit(state.copyWith(isLoading: true, filterList: filterList));

    final result = await _permissionsRepository.getPermissionList(filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
        if (success.data.isNotEmpty) {
          getRolePermissions(success.data.first.id);
        }
      },
    );
  }

  Future<void> getPermissionTree({String search = ''}) async {
    final normalizedSearch = search.trim();
    final requestId = ++_permissionTreeRequestId;
    emit(
      state.copyWith(
        isLoadingPermissionTree: true,
        isPaginatingPermissionTree: false,
        hasMorePermissionTree: true,
        permissionTreeSearch: normalizedSearch,
      ),
    );

    final result = await _permissionsRepository.getPermissionTree(
      _permissionFilter(search: normalizedSearch, offset: 0),
    );
    if (requestId != _permissionTreeRequestId) return;

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoadingPermissionTree: false));
      },
      (success) {
        emit(
          state.copyWith(
            permissionTree: success.data,
            isLoadingPermissionTree: false,
            hasMorePermissionTree: success.data.userGroupTree.isNotEmpty,
          ),
        );
      },
    );
  }

  Future<void> searchPermissionTree(String search) async {
    final normalizedSearch = search.trim();
    if (normalizedSearch == state.permissionTreeSearch) return;

    await getPermissionTree(search: normalizedSearch);
  }

  Future<void> loadMorePermissionTree() async {
    final currentTree = state.permissionTree;
    if (currentTree == null) return;
    if (state.isLoadingPermissionTree ||
        state.isPaginatingPermissionTree ||
        !state.hasMorePermissionTree) {
      return;
    }

    emit(state.copyWith(isPaginatingPermissionTree: true));
    final requestId = _permissionTreeRequestId;
    final search = state.permissionTreeSearch;
    final currentNodeCount = _userGroupTreeNodeCount(currentTree.userGroupTree);

    final result = await _permissionsRepository.getPermissionTree(
      _permissionFilter(search: search, offset: currentNodeCount),
    );
    if (requestId != _permissionTreeRequestId || search != state.permissionTreeSearch) return;

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isPaginatingPermissionTree: false));
      },
      (success) {
        final nextGroups = success.data.userGroupTree;
        final mergedGroups = _mergeUserGroupTrees(currentTree.userGroupTree, nextGroups);
        final mergedNodeCount = _userGroupTreeNodeCount(mergedGroups);
        emit(
          state.copyWith(
            permissionTree: PermissionTreeModel(
              roleList: currentTree.roleList,
              userGroupTree: mergedGroups,
              cacheId: currentTree.cacheId,
            ),
            isPaginatingPermissionTree: false,
            hasMorePermissionTree: nextGroups.isNotEmpty && mergedNodeCount > currentNodeCount,
          ),
        );
      },
    );
  }

  int _userGroupTreeNodeCount(List<UserGroupModel> groups) {
    return groups.fold(0, (count, group) => count + 1 + _userGroupTreeNodeCount(group.children));
  }

  List<UserGroupModel> _mergeUserGroupTrees(
    List<UserGroupModel> currentGroups,
    List<UserGroupModel> nextGroups,
  ) {
    final mergedGroups = List<UserGroupModel>.from(currentGroups);

    for (final nextGroup in nextGroups) {
      final currentIndex = mergedGroups.indexWhere((group) => group.id == nextGroup.id);
      if (currentIndex < 0) {
        mergedGroups.add(nextGroup);
        continue;
      }

      final currentGroup = mergedGroups[currentIndex];
      mergedGroups[currentIndex] = currentGroup.copyWith(
        children: _mergeUserGroupTrees(currentGroup.children, nextGroup.children),
      );
    }

    return mergedGroups;
  }

  Future<void> getRolePermissions(String roleId, {String search = ''}) async {
    final normalizedSearch = search.trim();
    final isNewRole = state.selectedRoleId != roleId;
    final requestId = ++_rolePermissionRequestId;
    emit(
      state.copyWith(
        isLoadingRolePermissions: true,
        isPaginatingRolePermissions: false,
        hasMoreRolePermissions: true,
        selectedRoleId: roleId,
        rolePermissionSearch: normalizedSearch,
        clearRoleFeaturePermissions: true,
        clearAllRoleFeaturePermissions: isNewRole,
      ),
    );

    final result = await _permissionsRepository.getRolePermissions(
      roleId,
      _permissionFilter(search: normalizedSearch, offset: 0),
    );
    if (requestId != _rolePermissionRequestId) return;

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoadingRolePermissions: false));
      },
      (success) {
        final permissions = success.data.items;
        emit(
          state.copyWith(
            roleFeaturePermissions: permissions,
            originalRoleFeaturePermissions: List<RoleFeaturePermissionsModel>.from(permissions),
            isLoadingRolePermissions: false,
            hasMoreRolePermissions: _hasMorePermissions(success.data),
          ),
        );
      },
    );

    if (isNewRole) {
      unawaited(_fetchAllRolePermissions(roleId, requestId));
    }
  }

  // Loads the complete, unpaginated permission set for the role in the
  // background so dependency-warning checks can see the whole graph, not just
  // whatever page/search result happens to be on screen.
  Future<void> _fetchAllRolePermissions(String roleId, int requestId) async {
    final result = await _permissionsRepository.getAllRolePermissions(roleId);
    if (requestId != _rolePermissionRequestId) return;

    result.fold(
      (failure) {},
      (success) => emit(
        state.copyWith(
          allRoleFeaturePermissions: _withPaginatedEditsApplied(
            success.data,
            state.roleFeaturePermissions,
            state.originalRoleFeaturePermissions,
          ),
          originalAllRoleFeaturePermissions: List<RoleFeaturePermissionsModel>.from(success.data),
        ),
      ),
    );
  }

  Future<void> searchRolePermissions(String search) async {
    final roleId = state.selectedRoleId;
    final normalizedSearch = search.trim();
    if (roleId == null || normalizedSearch == state.rolePermissionSearch) return;

    await getRolePermissions(roleId, search: normalizedSearch);
  }

  Future<void> loadMoreRolePermissions() async {
    final roleId = state.selectedRoleId;
    final currentPermissions = state.roleFeaturePermissions;
    if (roleId == null || currentPermissions == null) return;
    if (state.isLoadingRolePermissions ||
        state.isPaginatingRolePermissions ||
        !state.hasMoreRolePermissions) {
      return;
    }

    emit(state.copyWith(isPaginatingRolePermissions: true));
    final requestId = _rolePermissionRequestId;
    final search = state.rolePermissionSearch;

    final result = await _permissionsRepository.getRolePermissions(
      roleId,
      _permissionFilter(search: search, offset: currentPermissions.length),
    );
    if (requestId != _rolePermissionRequestId ||
        roleId != state.selectedRoleId ||
        search != state.rolePermissionSearch) {
      return;
    }

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isPaginatingRolePermissions: false));
      },
      (success) {
        final nextPermissions = success.data.items;
        final permissions = [...currentPermissions, ...nextPermissions];
        emit(
          state.copyWith(
            roleFeaturePermissions: permissions,
            originalRoleFeaturePermissions: [
              ...?state.originalRoleFeaturePermissions,
              ...nextPermissions,
            ],
            isPaginatingRolePermissions: false,
            hasMoreRolePermissions: _hasMorePermissions(success.data),
          ),
        );
      },
    );
  }

  FilterListDTO _permissionFilter({required String search, required int offset}) {
    return FilterListDTO(
      filterList: [
        FilterModelDTO(name: 'SEARCH', values: [search]),
      ],
      limit: _permissionPageSize.toString(),
      offset: offset.toString(),
    );
  }

  bool _hasMorePermissions(RolePermissionSearchResponse response) {
    final parsedLimit = int.tryParse(response.limit ?? '');
    final effectiveLimit = parsedLimit != null && parsedLimit > 0
        ? parsedLimit
        : _permissionPageSize;
    return response.items.isNotEmpty && response.items.length >= effectiveLimit;
  }

  Future<void> _getUserGroupPermissions(String userGroupId, {String search = ''}) async {
    final normalizedSearch = search.trim();
    final isNewGroup = state.selectedUserGroupId != userGroupId;
    final requestId = ++_userGroupPermissionRequestId;
    emit(
      state.copyWith(
        isLoadingUserGroupPermissions: true,
        isPaginatingUserGroupPermissions: false,
        hasMoreUserGroupPermissions: true,
        userGroupPermissionSearch: normalizedSearch,
        selectedUserGroupId: userGroupId,
        selectedPermissionGroupType: PermissionGroupType.userGroup,
        clearUserGroupFeaturePermissions: true,
        clearAllUserGroupFeaturePermissions: isNewGroup,
      ),
    );

    final result = await _permissionsRepository.getUserGroupPermissions(
      userGroupId,
      _permissionFilter(search: normalizedSearch, offset: 0),
    );
    if (requestId != _userGroupPermissionRequestId) return;

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoadingUserGroupPermissions: false));
      },
      (success) {
        emit(
          state.copyWith(
            userGroupFeaturePermissions: success.data.items,
            originalUserGroupFeaturePermissions: List<RoleFeaturePermissionsModel>.from(
              success.data.items,
            ),
            isLoadingUserGroupPermissions: false,
            hasMoreUserGroupPermissions: _hasMorePermissions(success.data),
          ),
        );
      },
    );

    if (isNewGroup) {
      unawaited(_fetchAllUserGroupPermissions(userGroupId, requestId));
    }
  }

  // Loads the complete, unpaginated permission set for the user group in the
  // background so dependency-warning checks can see the whole graph, not just
  // whatever page/search result happens to be on screen.
  Future<void> _fetchAllUserGroupPermissions(String userGroupId, int requestId) async {
    final result = await _permissionsRepository.getAllUserGroupPermissions(userGroupId);
    if (requestId != _userGroupPermissionRequestId) return;

    result.fold(
      (failure) {},
      (success) => emit(
        state.copyWith(
          allUserGroupFeaturePermissions: _withPaginatedEditsApplied(
            success.data,
            state.userGroupFeaturePermissions,
            state.originalUserGroupFeaturePermissions,
          ),
          originalAllUserGroupFeaturePermissions: List<RoleFeaturePermissionsModel>.from(
            success.data,
          ),
        ),
      ),
    );
  }

  // The background "all" fetch can resolve after the user has already edited
  // a permission on the (already-loaded) paginated page — while
  // allRoleFeaturePermissions/allUserGroupFeaturePermissions was still null,
  // so that edit only landed in the paginated list, never in the "all"
  // snapshot (_updateValidationPermission no-ops when there's no snapshot to
  // update yet). Overlay any permission that differs from its paginated
  // "original" onto the freshly fetched snapshot so that in-flight edit isn't
  // silently reverted the moment the fetch lands.
  List<RoleFeaturePermissionsModel> _withPaginatedEditsApplied(
    List<RoleFeaturePermissionsModel> fetchedAll,
    List<RoleFeaturePermissionsModel>? paginated,
    List<RoleFeaturePermissionsModel>? paginatedOriginal,
  ) {
    if (paginated == null || paginatedOriginal == null) return fetchedAll;

    final originalByType = <String, RolePermissionModel>{
      for (final feature in paginatedOriginal)
        for (final permission in feature.permissionList) permission.permissionType: permission,
    };
    final editedByType = <String, RolePermissionModel>{
      for (final feature in paginated)
        for (final permission in feature.permissionList)
          if (permission != originalByType[permission.permissionType])
            permission.permissionType: permission,
    };
    if (editedByType.isEmpty) return fetchedAll;

    return [
      for (final feature in fetchedAll)
        RoleFeaturePermissionsModel(
          feature: feature.feature,
          permissionList: [
            for (final permission in feature.permissionList)
              editedByType[permission.permissionType] ?? permission,
          ],
        ),
    ];
  }

  Future<void> _searchUserGroupPermissions(String search) async {
    final userGroupId = state.selectedUserGroupId;
    final normalizedSearch = search.trim();
    if (userGroupId == null || normalizedSearch == state.userGroupPermissionSearch) return;

    await _getUserGroupPermissions(userGroupId, search: normalizedSearch);
  }

  Future<void> searchSelectedGroupPermissions(String search) {
    return switch (state.selectedPermissionGroupType) {
      PermissionGroupType.userGroup => _searchUserGroupPermissions(search),
      null => Future<void>.value(),
    };
  }

  Future<void> _loadMoreUserGroupPermissions() async {
    final userGroupId = state.selectedUserGroupId;
    final currentPermissions = state.userGroupFeaturePermissions;
    if (userGroupId == null || currentPermissions == null) return;
    if (state.isLoadingUserGroupPermissions ||
        state.isPaginatingUserGroupPermissions ||
        !state.hasMoreUserGroupPermissions) {
      return;
    }

    emit(state.copyWith(isPaginatingUserGroupPermissions: true));
    final requestId = _userGroupPermissionRequestId;
    final search = state.userGroupPermissionSearch;

    final result = await _permissionsRepository.getUserGroupPermissions(
      userGroupId,
      _permissionFilter(search: search, offset: currentPermissions.length),
    );
    if (requestId != _userGroupPermissionRequestId ||
        userGroupId != state.selectedUserGroupId ||
        search != state.userGroupPermissionSearch) {
      return;
    }

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isPaginatingUserGroupPermissions: false));
      },
      (success) {
        final nextPermissions = success.data.items;
        emit(
          state.copyWith(
            userGroupFeaturePermissions: [...currentPermissions, ...nextPermissions],
            originalUserGroupFeaturePermissions: [
              ...?state.originalUserGroupFeaturePermissions,
              ...nextPermissions,
            ],
            isPaginatingUserGroupPermissions: false,
            hasMoreUserGroupPermissions: _hasMorePermissions(success.data),
          ),
        );
      },
    );
  }

  Future<void> loadMoreSelectedGroupPermissions() {
    return switch (state.selectedPermissionGroupType) {
      PermissionGroupType.userGroup => _loadMoreUserGroupPermissions(),
      null => Future<void>.value(),
    };
  }

  Future<void> selectGroupPermissions(UserGroupModel group) {
    emit(state.copyWith(selectedPermissionGroup: group));
    return _getUserGroupPermissions(group.id);
  }

  void clearSelectedGroup() {
    _userGroupPermissionRequestId++;
    emit(
      state.copyWith(
        clearSelectedPermissionGroup: true,
        clearUserGroupFeaturePermissions: true,
        isLoadingUserGroupPermissions: false,
      ),
    );
  }

  void updateSelectedGroupPermissionScope(int featureIndex, int permissionIndex, String newScope) {
    final target = _selectedGroupTarget;
    if (target == null) return;

    _updatePermission(
      target: target,
      featureIndex: featureIndex,
      permissionIndex: permissionIndex,
      update: (permission) => permission.copyWith(scope: newScope),
    );
  }

  void updateSelectedGroupPermissionEffect(
    int featureIndex,
    int permissionIndex,
    String newEffect,
  ) {
    final target = _selectedGroupTarget;
    if (target == null) return;

    _updatePermission(
      target: target,
      featureIndex: featureIndex,
      permissionIndex: permissionIndex,
      update: (permission) => _withEffect(permission, newEffect),
    );
  }

  _PermissionTarget? get _selectedGroupTarget => switch (state.selectedPermissionGroupType) {
    PermissionGroupType.userGroup => _PermissionTarget.userGroup,
    null => null,
  };

  void updatePermissionScope(int featureIndex, int permissionIndex, String newScope) {
    _updatePermission(
      target: _PermissionTarget.role,
      featureIndex: featureIndex,
      permissionIndex: permissionIndex,
      update: (permission) => permission.copyWith(scope: newScope),
    );
  }

  void updatePermissionEffect(int featureIndex, int permissionIndex, String newEffect) {
    _updatePermission(
      target: _PermissionTarget.role,
      featureIndex: featureIndex,
      permissionIndex: permissionIndex,
      update: (permission) => _withEffect(permission, newEffect),
    );
  }

  void updatePermissionEffectByType(String permissionType, String newEffect) {
    _updatePermissionByType(
      target: _PermissionTarget.role,
      permissionType: permissionType,
      update: (permission) => _withEffect(permission, newEffect),
    );
  }

  void updatePermissionScopeByType(String permissionType, String newScope) {
    _updatePermissionByType(
      target: _PermissionTarget.role,
      permissionType: permissionType,
      update: (permission) => permission.copyWith(scope: newScope),
    );
  }

  void updateSelectedGroupPermissionEffectByType(String permissionType, String newEffect) {
    final target = _selectedGroupTarget;
    if (target == null) return;

    _updatePermissionByType(
      target: target,
      permissionType: permissionType,
      update: (permission) => _withEffect(permission, newEffect),
    );
  }

  void updateSelectedGroupPermissionScopeByType(String permissionType, String newScope) {
    final target = _selectedGroupTarget;
    if (target == null) return;

    _updatePermissionByType(
      target: target,
      permissionType: permissionType,
      update: (permission) => permission.copyWith(scope: newScope),
    );
  }

  void _updatePermissionByType({
    required _PermissionTarget target,
    required String permissionType,
    required RolePermissionModel Function(RolePermissionModel permission) update,
  }) {
    final features = switch (target) {
      _PermissionTarget.role => state.roleFeaturePermissions,
      _PermissionTarget.userGroup => state.userGroupFeaturePermissions,
    };

    if (features != null) {
      for (int featureIndex = 0; featureIndex < features.length; featureIndex++) {
        final permissionIndex = features[featureIndex].permissionList.indexWhere(
          (permission) => permission.permissionType == permissionType,
        );
        if (permissionIndex == -1) continue;

        _updatePermission(
          target: target,
          featureIndex: featureIndex,
          permissionIndex: permissionIndex,
          update: update,
        );
        return;
      }
    }

    // Not on the currently loaded/paginated page — this happens when the
    // dependency-resolution dialog surfaces a permission from the complete
    // validation snapshot that hasn't been paged into the visible table.
    // Update the validation snapshot directly so the warning can still be
    // resolved from the dialog.
    _updateValidationPermission(target: target, permissionType: permissionType, update: update);
  }

  void _updatePermission({
    required _PermissionTarget target,
    required int featureIndex,
    required int permissionIndex,
    required RolePermissionModel Function(RolePermissionModel permission) update,
  }) {
    final features = switch (target) {
      _PermissionTarget.role => state.roleFeaturePermissions,
      _PermissionTarget.userGroup => state.userGroupFeaturePermissions,
    };
    if (features == null || featureIndex < 0 || featureIndex >= features.length) return;

    final feature = features[featureIndex];
    if (permissionIndex < 0 || permissionIndex >= feature.permissionList.length) return;

    final permissionType = feature.permissionList[permissionIndex].permissionType;
    final updatedPermissions = List<RolePermissionModel>.from(feature.permissionList);
    updatedPermissions[permissionIndex] = update(updatedPermissions[permissionIndex]);

    final updatedFeatures = List<RoleFeaturePermissionsModel>.from(features);
    updatedFeatures[featureIndex] = RoleFeaturePermissionsModel(
      feature: feature.feature,
      permissionList: updatedPermissions,
    );

    emit(switch (target) {
      _PermissionTarget.role => state.copyWith(roleFeaturePermissions: updatedFeatures),
      _PermissionTarget.userGroup => state.copyWith(userGroupFeaturePermissions: updatedFeatures),
    });

    // Keep the complete validation snapshot in sync with edits made through
    // the paginated table, so dependency checks always see the latest state.
    _updateValidationPermission(target: target, permissionType: permissionType, update: update);
  }

  // Applies `update` to the permission with `permissionType` inside the
  // complete, unpaginated validation snapshot.
  void _updateValidationPermission({
    required _PermissionTarget target,
    required String permissionType,
    required RolePermissionModel Function(RolePermissionModel permission) update,
  }) {
    final validationFeatures = switch (target) {
      _PermissionTarget.role => state.allRoleFeaturePermissions,
      _PermissionTarget.userGroup => state.allUserGroupFeaturePermissions,
    };
    if (validationFeatures == null) return;

    for (int featureIndex = 0; featureIndex < validationFeatures.length; featureIndex++) {
      final feature = validationFeatures[featureIndex];
      final permissionIndex = feature.permissionList.indexWhere(
        (permission) => permission.permissionType == permissionType,
      );
      if (permissionIndex == -1) continue;

      final updatedPermissions = List<RolePermissionModel>.from(feature.permissionList);
      updatedPermissions[permissionIndex] = update(updatedPermissions[permissionIndex]);

      final updatedFeatures = List<RoleFeaturePermissionsModel>.from(validationFeatures);
      updatedFeatures[featureIndex] = RoleFeaturePermissionsModel(
        feature: feature.feature,
        permissionList: updatedPermissions,
      );

      emit(switch (target) {
        _PermissionTarget.role => state.copyWith(allRoleFeaturePermissions: updatedFeatures),
        _PermissionTarget.userGroup => state.copyWith(
          allUserGroupFeaturePermissions: updatedFeatures,
        ),
      });
      return;
    }
  }

  RolePermissionModel _withEffect(RolePermissionModel permission, String effect) {
    final updatedPermission = permission.copyWith(effect: effect);
    return updatedPermission.permissionEffectEnum == PermissionEffect.allow
        ? updatedPermission
        : updatedPermission.copyWith(scope: PermissionScope.all.value);
  }

  Future<void> saveRolePermissions({bool forceSave = false}) async {
    if (state.isSaving || state.selectedRoleId == null || state.roleFeaturePermissions == null) {
      return;
    }

    if (!forceSave) {
      final warnings = findMissingDependencyWarnings(
        state.roleDependencyValidationPermissions!,
        state.roleDependencyValidationOriginalPermissions ?? const [],
      );
      if (warnings.isNotEmpty) {
        emit(state.copyWith(pendingRoleDependencyWarnings: warnings));
        return;
      }
    }

    emit(state.copyWith(isSaving: true, clearPendingRoleDependencyWarnings: true));

    final result = await _permissionsRepository.saveRolePermissions(
      roleId: state.selectedRoleId!,
      permissions: state.rolePermissions,
    );

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isSaving: false));
      },
      (_) {
        final savedAllPermissions = state.allRoleFeaturePermissions;
        emit(
          state.copyWith(
            originalRoleFeaturePermissions: List<RoleFeaturePermissionsModel>.from(
              state.roleFeaturePermissions!,
            ),
            originalAllRoleFeaturePermissions: savedAllPermissions == null
                ? null
                : List<RoleFeaturePermissionsModel>.from(savedAllPermissions),
            isSaving: false,
          ),
        );
        getIt<MenuBloc>().add(GetMenuList());
        getIt<DashboardMenuBloc>().add(GetDashboardMenu());
      },
    );
  }

  void dismissPendingRoleDependencyWarnings({
    List<RoleFeaturePermissionsModel>? revertTo,
    List<RoleFeaturePermissionsModel>? revertAllTo,
  }) {
    emit(
      state.copyWith(
        roleFeaturePermissions: revertTo,
        allRoleFeaturePermissions: revertAllTo,
        clearPendingRoleDependencyWarnings: true,
      ),
    );
  }

  Future<void> _saveUserGroupPermissions({bool forceSave = false}) async {
    if (state.isSaving ||
        state.selectedUserGroupId == null ||
        state.userGroupFeaturePermissions == null) {
      return;
    }

    if (!forceSave) {
      final warnings = findMissingDependencyWarnings(
        state.selectedGroupDependencyValidationPermissions!,
        state.selectedGroupDependencyValidationOriginalPermissions ?? const [],
      );
      if (warnings.isNotEmpty) {
        emit(state.copyWith(pendingGroupDependencyWarnings: warnings));
        return;
      }
    }

    emit(state.copyWith(isSaving: true, clearPendingGroupDependencyWarnings: true));

    final result = await _permissionsRepository.saveUserGroupPermissions(
      userGroupId: state.selectedUserGroupId!,
      permissions: state.userGroupPermissions,
    );

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isSaving: false));
      },
      (_) {
        final savedAllPermissions = state.allUserGroupFeaturePermissions;
        emit(
          state.copyWith(
            originalUserGroupFeaturePermissions: List<RoleFeaturePermissionsModel>.from(
              state.userGroupFeaturePermissions!,
            ),
            originalAllUserGroupFeaturePermissions: savedAllPermissions == null
                ? null
                : List<RoleFeaturePermissionsModel>.from(savedAllPermissions),
            isSaving: false,
          ),
        );
        getIt<MenuBloc>().add(GetMenuList());
        getIt<DashboardMenuBloc>().add(GetDashboardMenu());
      },
    );
  }

  Future<void> saveSelectedGroupPermissions({bool forceSave = false}) {
    return switch (state.selectedPermissionGroupType) {
      PermissionGroupType.userGroup => _saveUserGroupPermissions(forceSave: forceSave),
      null => Future<void>.value(),
    };
  }

  // Loads the role/user group tree on demand for the "Apply to..." picker.
  // The Role page never loads it otherwise (it only needs the role list for
  // its own dropdown), and re-fetching it every time the picker opens would
  // be wasteful once it's already loaded (e.g. on the User Group page).
  Future<void> ensurePermissionTreeLoaded() async {
    if (state.permissionTree != null || state.isLoadingPermissionTree) return;
    await getPermissionTree();
  }

  // Copies one permission's current effect/scope onto other roles/user
  // groups in one go. Each target only has this single permission
  // upserted (the same partial-list semantics the regular per-entity save
  // already relies on — see KyselySetPermissionListToRoleInteractorRepo /
  // KyselySetPermissionListToUserGroupInteractorRepo, which delete-then-
  // reinsert only the permission types present in the given list), so
  // nothing else on the target role/group is touched.
  // Returns whether every target saved successfully.
  Future<bool> applyPermissionToTargets({
    required RolePermissionModel permission,
    required Set<String> roleIds,
    required Set<String> userGroupIds,
  }) async {
    final singleton = [permission];

    final results = await Future.wait([
      for (final roleId in roleIds)
        _permissionsRepository.saveRolePermissions(roleId: roleId, permissions: singleton),
      for (final userGroupId in userGroupIds)
        _permissionsRepository.saveUserGroupPermissions(
          userGroupId: userGroupId,
          permissions: singleton,
        ),
    ]);

    var allSucceeded = true;
    for (final result in results) {
      result.fold((failure) => allSucceeded = false, (_) {});
    }

    if (roleIds.contains(state.selectedRoleId)) {
      await getRolePermissions(state.selectedRoleId!);
    }
    if (userGroupIds.contains(state.selectedUserGroupId)) {
      await _getUserGroupPermissions(state.selectedUserGroupId!);
    }

    return allSucceeded;
  }

  void dismissPendingGroupDependencyWarnings({
    List<RoleFeaturePermissionsModel>? revertTo,
    List<RoleFeaturePermissionsModel>? revertAllTo,
  }) {
    if (revertTo == null) {
      emit(state.copyWith(clearPendingGroupDependencyWarnings: true));
      return;
    }

    emit(switch (state.selectedPermissionGroupType) {
      PermissionGroupType.userGroup => state.copyWith(
        userGroupFeaturePermissions: revertTo,
        allUserGroupFeaturePermissions: revertAllTo,
        clearPendingGroupDependencyWarnings: true,
      ),
      null => state.copyWith(clearPendingGroupDependencyWarnings: true),
    });
  }
}
