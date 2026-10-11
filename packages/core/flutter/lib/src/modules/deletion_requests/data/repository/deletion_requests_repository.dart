import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class DeletionRequestsRepository {
  Future<Either<Failure, Result<void>>> requestAccountDeletion();

  Future<Either<Failure, Result<void>>> cancelAccountDeletion();
}

abstract class DeletionRequestsRemoteDataSource {
  Future<void> requestAccountDeletion();

  Future<void> cancelAccountDeletion();
}
