import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/data_source/forgot_password_remote_data_source.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/model/forgot_password_code_dto.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/model/forgot_password_reset_dto.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/model/forgot_password_username_dto.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/repository/forgot_password_repository.dart';

class ForgotPasswordRepositoryImpl extends BaseRepository implements ForgotPasswordRepository {
  final ForgotPasswordRemoteDataSource remoteDataSource;

  ForgotPasswordRepositoryImpl({
    required super.errorHandler,
    required super.connectivityService,
    required this.remoteDataSource,
  });

  @override
  Future<Either<Failure, Result<void>>> sendResetCode(String userName) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.sendResetCode(ForgotPasswordUsernameDTO(userName: userName));
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> verifyResetCode(String userName, String code) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.verifyResetCode(
            ForgotPasswordCodeDTO(userName: userName, code: code),
          );
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> resetPassword(
    String userName,
    String code,
    String newPassword,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.resetPassword(
            ForgotPasswordResetDTO(userName: userName, code: code, newPassword: newPassword),
          );
        });
      },
    );
  }
}
