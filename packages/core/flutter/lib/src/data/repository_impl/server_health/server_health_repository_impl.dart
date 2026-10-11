import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/server_health/server_health_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/repository_impl/server_health/server_health_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class ServerHealthRemoteDataSource {
  Future<String> pingServer(String baseURL);
}

class ServerHealthRepositoryImpl extends BaseRepository implements ServerHealthRepository {
  final ServerHealthRemoteDataSource remoteDataSource;

  ServerHealthRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<ServerHealthModel>>> pingClient(String baseURL) async {
    return performOperationAndMapToResult(
      remoteOperation: () async {
        return performNetworkOperation<ServerHealthModel>(() async {
          final remoteTranslation = await remoteDataSource.pingServer(baseURL);
          if (remoteTranslation == 'OK') {
            return ServerHealthModel(serverUrl: baseURL, isHealthy: true);
          } else {
            return ServerHealthModel(serverUrl: baseURL, isHealthy: false);
          }
        });
      },
    );
  }
}
