import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_search_list_response.dart';
import 'package:copor_core/src/modules/administration/user/data/model/create_user_dto.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'user_remote_source.g.dart';

@RestApi()
abstract class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  factory UserRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _UserRemoteDataSourceImpl;

  @override
  @POST('/user/table')
  Future<CoporTableModel> getUserList(@Body() FilterListDTO filterList);

  @override
  @GET('/user/{id}')
  Future<UserModel> getUser(@Path('id') String userId);

  @override
  @DELETE('/user/{id}')
  Future<void> deleteUser(@Path('id') String userId);

  @override
  @PATCH('/user')
  Future<void> updateUser(@Body() UserModel userToUpdate);

  @override
  @POST('/user')
  Future<void> createUser(@Body() CreateUserDTO userToCreate);

  @override
  @POST('/user/list')
  Future<UserSearchListResponse> getUserSearchList(@Body() FilterListDTO filterList);
}
