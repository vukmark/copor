import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/deletion_requests/data/repository/deletion_requests_repository.dart';

class DeletionRequestsRepositoryImpl extends BaseRepository implements DeletionRequestsRepository {
  final DeletionRequestsRemoteDataSource remoteDataSource;

  DeletionRequestsRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<void>>> requestAccountDeletion() async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.requestAccountDeletion();
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> cancelAccountDeletion() async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.cancelAccountDeletion();
        });
      },
    );
  }
}
