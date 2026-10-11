import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/login/registration/data/data_source/registration_remote_data_source.dart';
import 'package:copor_core/src/modules/login/registration/data/model/register_request_dto.dart';
import 'package:copor_core/src/modules/login/registration/data/model/resend_registration_code_dto.dart';
import 'package:copor_core/src/modules/login/registration/data/model/verify_registration_dto.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/registration_repository.dart';

class RegistrationRepositoryImpl extends BaseRepository implements RegistrationRepository {
  final RegistrationRemoteDataSource remoteDataSource;

  RegistrationRepositoryImpl({
    required super.errorHandler,
    required super.connectivityService,
    required this.remoteDataSource,
  });

  @override
  Future<Either<Failure, Result<bool>>> isRegistrationEnabled() {
    return performOperationAndMapToResult<bool>(
      remoteOperation: () =>
          performNetworkOperation<bool>(() async => (await remoteDataSource.getStatus()).enabled),
    );
  }

  @override
  Future<Either<Failure, Result<void>>> register({
    required String firstName,
    required String lastName,
    required String email,
    required String userName,
    required String password,
  }) {
    return performVoidOperation(
      remoteOperation: () => performNetworkOperation<void>(
        () => remoteDataSource.register(
          RegisterRequestDTO(
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password,
          ),
        ),
      ),
    );
  }

  @override
  Future<Either<Failure, Result<void>>> verify({required String email, required String code}) {
    return performVoidOperation(
      remoteOperation: () => performNetworkOperation<void>(
        () => remoteDataSource.verify(VerifyRegistrationDTO(email: email, code: code)),
      ),
    );
  }

  @override
  Future<Either<Failure, Result<void>>> resendCode({required String email}) {
    return performVoidOperation(
      remoteOperation: () => performNetworkOperation<void>(
        () => remoteDataSource.resendCode(ResendRegistrationCodeDTO(email: email)),
      ),
    );
  }
}
