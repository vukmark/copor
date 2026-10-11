import 'package:copor_core/src/modules/login/registration/data/model/register_request_dto.dart';
import 'package:copor_core/src/modules/login/registration/data/model/registration_status_model.dart';
import 'package:copor_core/src/modules/login/registration/data/model/resend_registration_code_dto.dart';
import 'package:copor_core/src/modules/login/registration/data/model/verify_registration_dto.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'registration_remote_data_source.g.dart';

abstract class RegistrationRemoteDataSource {
  Future<RegistrationStatusModel> getStatus();

  Future<void> register(RegisterRequestDTO data);

  Future<void> verify(VerifyRegistrationDTO data);

  Future<void> resendCode(ResendRegistrationCodeDTO data);
}

// Public endpoints: keep frontend/lib/src/network/public_routes.dart and the
// backend JwtAuthenticationMiddleware.excludedEndpoints in sync.
@RestApi()
abstract class RegistrationRemoteDataSourceImpl implements RegistrationRemoteDataSource {
  factory RegistrationRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _RegistrationRemoteDataSourceImpl;

  @override
  @GET('/registration/status')
  @Extra({'doesNotRequireAuth': true})
  Future<RegistrationStatusModel> getStatus();

  @override
  @POST('/registration/')
  @Extra({'doesNotRequireAuth': true})
  Future<void> register(@Body() RegisterRequestDTO data);

  @override
  @POST('/registration/verify')
  @Extra({'doesNotRequireAuth': true})
  Future<void> verify(@Body() VerifyRegistrationDTO data);

  @override
  @POST('/registration/resend-code')
  @Extra({'doesNotRequireAuth': true})
  Future<void> resendCode(@Body() ResendRegistrationCodeDTO data);
}
