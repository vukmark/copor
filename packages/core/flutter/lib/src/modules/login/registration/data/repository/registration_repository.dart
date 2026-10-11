import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class RegistrationRepository {
  Future<Either<Failure, Result<bool>>> isRegistrationEnabled();

  Future<Either<Failure, Result<void>>> register({
    required String firstName,
    required String lastName,
    required String email,
    required String userName,
    required String password,
  });

  Future<Either<Failure, Result<void>>> verify({required String email, required String code});

  Future<Either<Failure, Result<void>>> resendCode({required String email});
}
