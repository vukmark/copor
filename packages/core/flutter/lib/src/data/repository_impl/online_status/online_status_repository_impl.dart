import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/repository_impl/online_status/online_status_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class OnlineStatusRemoteDataSource {
  Future<dynamic> getOnlineUserIds();
}

class OnlineStatusRepositoryImpl extends BaseRepository implements OnlineStatusRepository {
  final OnlineStatusRemoteDataSource remoteDataSource;

  OnlineStatusRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<String>>>> getOnlineUserIds() async {
    return performOperationAndMapToResult(
      remoteOperation: () async {
        return performNetworkOperation<List<String>>(() async {
          final response = await remoteDataSource.getOnlineUserIds() as Map<String, dynamic>;
          final onlineUserIds = response['onlineUserIds'] as List<dynamic>? ?? const [];
          return onlineUserIds.cast<String>();
        });
      },
    );
  }
}
