import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/role/data/model/create_role_dto.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class RoleRepository {
  Future<Either<Failure, Result<List<RoleModel>>>> getRoleList(FilterListDTO filterList);
  Future<Either<Failure, Result<void>>> deleteRole(String roleId);
  Future<Either<Failure, Result<RoleModel>>> getRole(String roleId);
  Future<Either<Failure, Result<void>>> createRole(CreateRoleDTO roleToCreate);
  Future<Either<Failure, Result<void>>> updateRole(CreateRoleDTO roleToUpdate);
}

abstract class RoleLocalDataSource {
  Future<List<RoleModel>> getRoleList();
  Future<void> setRoleList(List<RoleModel> model);
}

abstract class RoleRemoteDataSource {
  Future<List<RoleModel>> getRoleList(FilterListDTO filterList);
  Future<RoleModel> getRole(String roleId);
  Future<void> deleteRole(String roleId);
  Future<void> createRole(CreateRoleDTO roleToCreate);
  Future<void> updateRole(CreateRoleDTO roleToUpdate);
}
