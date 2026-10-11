import 'package:copor_core/src/data/model/authorization/change_password_model.dart';
import 'package:copor_core/src/data/model/authorization/login_credentials_model.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';
import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/model/authorization/user_profile_model.dart';

part 'authorization_remote_source.g.dart';

@RestApi()
abstract class AuthorizationRemoteDataSourceImpl implements AuthorizationRemoteDataSource {
  factory AuthorizationRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _AuthorizationRemoteDataSourceImpl;

  @override
  @POST("/login/refresh")
  Future<AuthorizationTokensModel> requestNewTokens(
    @Body() String refreshToken, {
    @Extras() Map<String, dynamic> extras = const {'doesNotRequireAuth': true},
  });

  @override
  @POST("/login")
  Future<AuthorizationTokensModel> login(
    @Body() LoginCredentialsModel loginCredentials, {
    @Extras() Map<String, dynamic> extras = const {'doesNotRequireAuth': true},
  });

  @override
  @POST("/login/refresh")
  Future<UserProfileModel> getUserDetails(
    @Body() String userId, {
    @Extras() Map<String, dynamic> extras = const {'doesNotRequireAuth': true},
  });

  @override
  @PATCH("/user/change-password")
  Future<void> changePassword(@Body() ChangePasswordModel changePasswordData);
}
