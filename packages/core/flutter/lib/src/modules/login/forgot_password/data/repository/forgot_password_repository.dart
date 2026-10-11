import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class ForgotPasswordRepository {
  Future<Either<Failure, Result<void>>> sendResetCode(String userName);

  Future<Either<Failure, Result<void>>> verifyResetCode(String userName, String code);

  Future<Either<Failure, Result<void>>> resetPassword(
    String userName,
    String code,
    String newPassword,
  );
}
