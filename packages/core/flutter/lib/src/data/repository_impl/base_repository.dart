import 'package:dartz/dartz.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class BaseRepository {
  final ErrorHandler errorHandler;
  final ConnectivityService connectivityService;
  BaseRepository({required this.errorHandler, required this.connectivityService});

  Future<Either<Failure, Model>> performNetworkOperation<Model>(
    Future<Model> Function() operation,
  ) async {
    try {
      final result = await operation();
      return Right(result);
    } catch (error) {
      return Left(errorHandler.handle(error));
    }
  }

  Future<Either<Failure, Model>> performLocalStorageOperation<Model>(
    Future<Model> Function() operation,
  ) async {
    try {
      final result = await operation();
      return Right(result);
    } on CacheException catch (e) {
      return Left(errorHandler.handle(e));
    } catch (error) {
      return Left(errorHandler.handle(error));
    }
  }

  Future<Either<Failure, Result<void>>> performVoidOperation({
    Future<Either<Failure, void>> Function()? localOperation,
    Future<Either<Failure, void>> Function()? remoteOperation,
  }) async {
    Failure? failure;
    if (localOperation != null) {
      final localResult = await localOperation();
      localResult.fold((localFailure) => failure = localFailure, (_) => {});
    }
    if (remoteOperation != null) {
      final remoteResult = await remoteOperation();
      remoteResult.fold((remoteFailure) => failure = remoteFailure, (_) => {});
    }
    if (failure != null) {
      return Left(failure!);
    }
    return Right(Result(data: null, warning: failure));
  }

  Future<Either<Failure, Result<ModelType>>> performOperationAndMapToResult<ModelType>({
    Future<Either<Failure, ModelType>> Function()? localOperation,
    Future<Either<Failure, ModelType>> Function()? remoteOperation,
  }) async {
    Failure? failure;
    ModelType? localModel;
    ModelType? remoteModel;
    if (localOperation != null) {
      final localResult = await localOperation();
      localResult.fold((localFailure) => failure = localFailure, (model) => localModel = model);
    }
    if (remoteOperation != null) {
      final remoteResult = await remoteOperation();
      remoteResult.fold((remoteFailure) => failure = remoteFailure, (model) => remoteModel = model);
    }
    final ModelType? finalModel = remoteModel ?? localModel;
    if (finalModel != null) {
      final Failure? warning = (failure is CacheNotFoundFailure)
          ? null
          : (failure?.responseCode == -2 ? null : failure);
      return Right(Result<ModelType>(data: finalModel, warning: warning));
    }
    return Left(failure!);
  }
}
