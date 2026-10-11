import 'dart:async';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class ConfigRepositoryImpl extends BaseRepository implements ConfigRepository {
  final ConfigRemoteDataSource remoteDataSource;
  final ConfigLocalDataSource localDataSource;

  ConfigRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<void>>> setConfig(ConfigModel configModel) async {
    return performVoidOperation(
      localOperation: () {
        return performLocalStorageOperation<void>(() => localDataSource.setConfig(configModel));
      },
    );
  }

  @override
  ConfigModel getCachedConfig() {
    return localDataSource.getCachedConfig() ?? ConfigModel.defaultConfig(version: '');
  }

  @override
  Future<Either<Failure, Result<ConfigModel>>> getConfig() async {
    return await performOperationAndMapToResult<ConfigModel>(
      localOperation: () {
        return performLocalStorageOperation<ConfigModel>(localDataSource.getConfig);
      },
      remoteOperation: () async {
        return performNetworkOperation(() async {
          final localConfig = await localDataSource.getConfig();
          final wsConfig = await remoteDataSource.getWebSocketConfig();
          final updatedConfig = localConfig.copyWith(webSocketUrl: wsConfig['server']);
          await localDataSource.setConfig(updatedConfig);
          return updatedConfig;
        });
      },
    );
  }
}

abstract class ConfigRemoteDataSource {
  Future<Map<String, String>> getWebSocketConfig();
}

abstract class ConfigLocalDataSource {
  Future<ConfigModel> getConfig();
  Future<void> setConfig(ConfigModel configModel);
  Stream<ConfigModel> getConfigStream();
  ConfigModel? getCachedConfig();
}
