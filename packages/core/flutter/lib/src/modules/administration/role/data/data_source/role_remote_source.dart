import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/role/data/model/create_role_dto.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_model.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

import '../repository/role_repository.dart';

part 'role_remote_source.g.dart';

@RestApi()
abstract class RoleRemoteDataSourceImpl implements RoleRemoteDataSource {
  factory RoleRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _RoleRemoteDataSourceImpl;

  @override
  @POST('/role/list')
  Future<List<RoleModel>> getRoleList(@Body() FilterListDTO filterList);

  @override
  @GET('/role/{id}')
  Future<RoleModel> getRole(@Path('id') String roleId);

  @override
  @DELETE('/role/{id}')
  Future<void> deleteRole(@Path('id') String roleId);

  @override
  @PATCH('/role')
  Future<void> updateRole(@Body() CreateRoleDTO roleToUpdate);

  @override
  @POST('/role')
  Future<void> createRole(@Body() CreateRoleDTO roleToCreate);
}
