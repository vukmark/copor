import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_request.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_users_response.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/repository/user_groups_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'user_groups_remote_source.g.dart';

@RestApi()
abstract class UserGroupsRemoteDataSourceImpl implements UserGroupsRemoteDataSource {
  factory UserGroupsRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _UserGroupsRemoteDataSourceImpl;

  @override
  @GET('/user-group/')
  Future<List<UserGroupModel>> getUserGroupTree();

  @override
  @DELETE('/user-group/{id}')
  Future<void> deleteUserGroup(@Path('id') String userGroupId);

  @override
  @POST('/user-group/get-users')
  Future<UserGroupUsersResponse> getUserGroupUsers(@Body() UserGroupUsersRequest request);
}
