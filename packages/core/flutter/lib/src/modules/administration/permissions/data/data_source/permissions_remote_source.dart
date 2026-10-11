import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_tree_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_search_response.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/save_permissions_request.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

import '../repository/permissions_repository.dart';

part 'permissions_remote_source.g.dart';

@RestApi()
abstract class PermissionsRemoteDataSourceImpl implements PermissionsRemoteDataSource {
  factory PermissionsRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _PermissionsRemoteDataSourceImpl;

  @override
  @POST('/role/list')
  Future<List<PermissionModel>> getPermissionList(@Body() FilterListDTO filterList);

  @override
  @POST('/permission/role/{id}')
  Future<RolePermissionSearchResponse> getRolePermissions(
    @Path('id') String roleId,
    @Body() FilterListDTO filterList,
  );

  @override
  @GET('/permission/role/{id}')
  Future<List<RoleFeaturePermissionsModel>> getAllRolePermissions(@Path('id') String roleId);

  @override
  @POST('/permission/user-group/{id}')
  Future<RolePermissionSearchResponse> getUserGroupPermissions(
    @Path('id') String userGroupId,
    @Body() FilterListDTO filterList,
  );

  @override
  @GET('/permission/user-group/{id}')
  Future<List<RoleFeaturePermissionsModel>> getAllUserGroupPermissions(
    @Path('id') String userGroupId,
  );

  @override
  @GET('/permission/user/{id}')
  Future<List<RoleFeaturePermissionsModel>> getUserPermissions(@Path('id') String userId);

  @override
  @POST('/permission/role')
  Future<void> saveRolePermissions(@Body() SaveRolePermissionsRequest request);

  @override
  @POST('/permission/user-group')
  Future<void> saveUserGroupPermissions(@Body() SaveUserGroupPermissionsRequest request);

  @override
  @POST('/permission/tree')
  Future<PermissionTreeModel> getPermissionTree(@Body() FilterListDTO filterList);
}
