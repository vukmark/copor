import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_tree_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_search_response.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/save_permissions_request.dart';
import 'package:copor_core/src/modules/administration/permissions/data/repository/permissions_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class PermissionsRepositoryImpl extends BaseRepository implements PermissionsRepository {
  final PermissionsRemoteDataSource remoteDataSource;

  PermissionsRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<PermissionModel>>>> getPermissionList(
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<List<PermissionModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<PermissionModel>>(() async {
          final permissionList = await remoteDataSource.getPermissionList(filterList);
          return permissionList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<RolePermissionSearchResponse>>> getRolePermissions(
    String roleId,
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<RolePermissionSearchResponse>(
      remoteOperation: () async {
        return performNetworkOperation<RolePermissionSearchResponse>(() async {
          return remoteDataSource.getRolePermissions(roleId, filterList);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<RoleFeaturePermissionsModel>>>> getAllRolePermissions(
    String roleId,
  ) async {
    return performOperationAndMapToResult<List<RoleFeaturePermissionsModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<RoleFeaturePermissionsModel>>(() async {
          return remoteDataSource.getAllRolePermissions(roleId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<RolePermissionSearchResponse>>> getUserGroupPermissions(
    String userGroupId,
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<RolePermissionSearchResponse>(
      remoteOperation: () async {
        return performNetworkOperation<RolePermissionSearchResponse>(() async {
          return remoteDataSource.getUserGroupPermissions(userGroupId, filterList);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<RoleFeaturePermissionsModel>>>> getAllUserGroupPermissions(
    String userGroupId,
  ) async {
    return performOperationAndMapToResult<List<RoleFeaturePermissionsModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<RoleFeaturePermissionsModel>>(() async {
          return remoteDataSource.getAllUserGroupPermissions(userGroupId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<RoleFeaturePermissionsModel>>>> getUserPermissions(
    String userId,
  ) async {
    return performOperationAndMapToResult<List<RoleFeaturePermissionsModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<RoleFeaturePermissionsModel>>(() async {
          return remoteDataSource.getUserPermissions(userId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, void>> saveRolePermissions({
    required String roleId,
    required List<RolePermissionModel> permissions,
  }) async {
    return performNetworkOperation(() async {
      await remoteDataSource.saveRolePermissions(
        SaveRolePermissionsRequest(roleId: roleId, permissionList: permissions),
      );
    });
  }

  @override
  Future<Either<Failure, void>> saveUserGroupPermissions({
    required String userGroupId,
    required List<RolePermissionModel> permissions,
  }) async {
    return performNetworkOperation(() async {
      await remoteDataSource.saveUserGroupPermissions(
        SaveUserGroupPermissionsRequest(userGroupId: userGroupId, permissionList: permissions),
      );
    });
  }

  @override
  Future<Either<Failure, Result<PermissionTreeModel>>> getPermissionTree(
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<PermissionTreeModel>(
      remoteOperation: () async {
        return performNetworkOperation<PermissionTreeModel>(() async {
          return remoteDataSource.getPermissionTree(filterList);
        });
      },
    );
  }
}
