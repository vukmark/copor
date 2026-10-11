import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/state/data/model/create_state_dto.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class StateRepositoryImpl extends BaseRepository implements StateRepository {
  final StateRemoteDataSource remoteDataSource;
  final StateLocalDataSource localDataSource;

  StateRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<StateModel>>>> getStateList() async {
    return performOperationAndMapToResult<List<StateModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<StateModel>>(() async {
          final localStateList = await localDataSource.getStateList();
          return localStateList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<StateModel>>(() async {
          final stateList = await remoteDataSource.getStateList();
          await localDataSource.setStateList(stateList);
          return stateList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<StateModel>>> getState(String stateId) async {
    return performOperationAndMapToResult<StateModel>(
      remoteOperation: () async {
        return performNetworkOperation<StateModel>(() async {
          final state = await remoteDataSource.getState(stateId);
          return state;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<StateModel>>> getPublicState(String stateId) async {
    return performOperationAndMapToResult<StateModel>(
      remoteOperation: () async {
        return performNetworkOperation<StateModel>(() async {
          final state = await remoteDataSource.getPublicState(stateId);
          return state;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteState(String stateId) {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteState(stateId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createState(CreateStateDTO stateToCreate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createState(stateToCreate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateState(StateModel stateToUpdate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateState(stateToUpdate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<StateModel>>>> getPublicStateListByCountry(
    String countryId,
  ) async {
    return performOperationAndMapToResult<List<StateModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<StateModel>>(() async {
          final stateList = await remoteDataSource.getPublicStateListByCountry(countryId);
          return stateList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<StateModel>>>> getStateListByCountry(String countryId) async {
    return performOperationAndMapToResult<List<StateModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<StateModel>>(() async {
          final stateList = await remoteDataSource.getStateListByCountry(countryId);
          return stateList;
        });
      },
    );
  }
}
