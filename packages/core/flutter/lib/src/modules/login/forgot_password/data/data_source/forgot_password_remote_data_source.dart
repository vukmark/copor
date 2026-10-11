import 'package:copor_core/src/modules/login/forgot_password/data/model/forgot_password_code_dto.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/model/forgot_password_reset_dto.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/model/forgot_password_username_dto.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'forgot_password_remote_data_source.g.dart';

abstract class ForgotPasswordRemoteDataSource {
  Future<void> sendResetCode(ForgotPasswordUsernameDTO data);

  Future<void> verifyResetCode(ForgotPasswordCodeDTO data);

  Future<void> resetPassword(ForgotPasswordResetDTO data);
}

@RestApi()
abstract class ForgotPasswordRemoteDataSourceImpl implements ForgotPasswordRemoteDataSource {
  factory ForgotPasswordRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _ForgotPasswordRemoteDataSourceImpl;

  @override
  @POST('/user/forgot-password/send-code')
  @Extra({'doesNotRequireAuth': true})
  Future<void> sendResetCode(@Body() ForgotPasswordUsernameDTO data);

  @override
  @POST('/user/forgot-password/verify-code')
  @Extra({'doesNotRequireAuth': true})
  Future<void> verifyResetCode(@Body() ForgotPasswordCodeDTO data);

  @override
  @POST('/user/forgot-password/reset-password')
  @Extra({'doesNotRequireAuth': true})
  Future<void> resetPassword(@Body() ForgotPasswordResetDTO data);
}
