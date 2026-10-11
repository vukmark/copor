import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'password_validation_remote_data_source.g.dart';

abstract class PasswordValidationRemoteDataSource {
  Future<PasswordPolicyModel> getPolicy();
}

@RestApi()
abstract class PasswordValidationRemoteDataSourceImpl
    implements PasswordValidationRemoteDataSource {
  factory PasswordValidationRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _PasswordValidationRemoteDataSourceImpl;

  @override
  @GET('/password/policy')
  @Extra({'doesNotRequireAuth': true})
  Future<PasswordPolicyModel> getPolicy();
}
