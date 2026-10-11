import 'package:dartz/dartz.dart';
import 'package:copor_core/src/components/password_validation/data/data_source/password_validation_remote_data_source.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:copor_core/src/components/password_validation/data/repository/password_validation_repository.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';

class PasswordValidationRepositoryImpl extends BaseRepository
    implements PasswordValidationRepository {
  final PasswordValidationRemoteDataSource remoteDataSource;

  PasswordValidationRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, PasswordPolicyModel>> getPolicy() {
    return performNetworkOperation<PasswordPolicyModel>(() async {
      return remoteDataSource.getPolicy();
    });
  }
}
