import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';

class FeatureRepositoryImpl extends BaseRepository implements FeatureRepository {
  final FeatureRemoteDataSource remoteDataSource;
  final FeatureLocalDataSource localDataSource;

  FeatureRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<FeatureListModel>>> getFeatureList() async {
    return performOperationAndMapToResult<FeatureListModel>(
      localOperation: () async {
        return performLocalStorageOperation<FeatureListModel>(() async {
          return await localDataSource.getFeatureList();
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<FeatureListModel>(() async {
          final featureList = await remoteDataSource.getFeatureList();
          await localDataSource.setFeatureList(featureList);
          return featureList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<MenuListModel>>> getMenuList(String languageCode) async {
    return performOperationAndMapToResult<MenuListModel>(
      remoteOperation: () async {
        return performNetworkOperation<MenuListModel>(() async {
          return await remoteDataSource.getMenuList(languageCode);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<FeatureModel>>>> getFeatureListForRoles() async {
    return performOperationAndMapToResult<List<FeatureModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<FeatureModel>>(() async {
          return await remoteDataSource.getFeatureListForRoles();
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> setFeatureList(
    List<FeatureModelDTO> featuresToUpdate,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.setFeatureList(featuresToUpdate);
        });
      },
    );
  }
}
