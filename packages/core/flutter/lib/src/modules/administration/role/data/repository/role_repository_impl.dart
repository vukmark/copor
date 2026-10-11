import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/role/data/model/create_role_dto.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_model.dart';
import 'package:copor_core/src/modules/administration/role/data/repository/role_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class RoleRepositoryImpl extends BaseRepository implements RoleRepository {
  final RoleRemoteDataSource remoteDataSource;
  final RoleLocalDataSource localDataSource;

  RoleRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<RoleModel>>>> getRoleList(FilterListDTO filterList) async {
    return performOperationAndMapToResult<List<RoleModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<RoleModel>>(() async {
          final localRoleList = await localDataSource.getRoleList();
          return localRoleList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<RoleModel>>(() async {
          final roleList = await remoteDataSource.getRoleList(filterList);
          await localDataSource.setRoleList(roleList);
          return roleList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<RoleModel>>> getRole(String roleId) async {
    return performOperationAndMapToResult<RoleModel>(
      remoteOperation: () async {
        return performNetworkOperation<RoleModel>(() async {
          final role = await remoteDataSource.getRole(roleId);
          return role;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteRole(String roleId) {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteRole(roleId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createRole(CreateRoleDTO roleToCreate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createRole(roleToCreate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateRole(CreateRoleDTO roleToUpdate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateRole(roleToUpdate);
        });
      },
    );
  }
}
