import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_tree_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_search_response.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/save_permissions_request.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class PermissionsRepository {
  Future<Either<Failure, Result<List<PermissionModel>>>> getPermissionList(
    FilterListDTO filterList,
  );

  Future<Either<Failure, Result<RolePermissionSearchResponse>>> getRolePermissions(
    String roleId,
    FilterListDTO filterList,
  );

  // Complete (unpaginated), all-features snapshot used to validate permission
  // dependencies across the whole role, independent of what page/search is
  // currently displayed in the editor.
  Future<Either<Failure, Result<List<RoleFeaturePermissionsModel>>>> getAllRolePermissions(
    String roleId,
  );

  Future<Either<Failure, Result<RolePermissionSearchResponse>>> getUserGroupPermissions(
    String userGroupId,
    FilterListDTO filterList,
  );

  // Complete (unpaginated), all-features snapshot used to validate permission
  // dependencies across the whole user group, independent of what page/search
  // is currently displayed in the editor.
  Future<Either<Failure, Result<List<RoleFeaturePermissionsModel>>>> getAllUserGroupPermissions(
    String userGroupId,
  );

  // Resolved, read-only effective permission set for one specific user
  // (user overrides -> user group -> role default already applied), used by
  // the Users table's "View permissions" action.
  Future<Either<Failure, Result<List<RoleFeaturePermissionsModel>>>> getUserPermissions(
    String userId,
  );

  Future<Either<Failure, void>> saveRolePermissions({
    required String roleId,
    required List<RolePermissionModel> permissions,
  });

  Future<Either<Failure, void>> saveUserGroupPermissions({
    required String userGroupId,
    required List<RolePermissionModel> permissions,
  });

  Future<Either<Failure, Result<PermissionTreeModel>>> getPermissionTree(FilterListDTO filterList);
}

abstract class PermissionsLocalDataSource {
  Future<List<PermissionModel>> getPermissionList();

  Future<void> setPermissionList(List<PermissionModel> model);
}

abstract class PermissionsRemoteDataSource {
  Future<List<PermissionModel>> getPermissionList(FilterListDTO filterList);

  Future<RolePermissionSearchResponse> getRolePermissions(String roleId, FilterListDTO filterList);

  Future<List<RoleFeaturePermissionsModel>> getAllRolePermissions(String roleId);

  Future<RolePermissionSearchResponse> getUserGroupPermissions(
    String userGroupId,
    FilterListDTO filterList,
  );

  Future<List<RoleFeaturePermissionsModel>> getAllUserGroupPermissions(String userGroupId);


  Future<List<RoleFeaturePermissionsModel>> getUserPermissions(String userId);

  Future<void> saveRolePermissions(SaveRolePermissionsRequest request);

  Future<void> saveUserGroupPermissions(SaveUserGroupPermissionsRequest request);


  Future<PermissionTreeModel> getPermissionTree(FilterListDTO filterList);
}
