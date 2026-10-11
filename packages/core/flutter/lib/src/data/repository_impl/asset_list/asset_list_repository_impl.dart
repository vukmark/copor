import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/data/model/asset_list/namespace_entity/login_asset_list.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/repository_impl/asset_list/asset_list_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

var loginAssetList = CommonAssetListModel(
  assetUrlList: {'Logo': '/assets/img/logo.png', 'Background': '/assets/img/white-background.png'},
);

abstract class AssetListRemoteDataSource {
  Future<AssetListModel> getAssetList(String namespace);
}

abstract class AssetListLocalDataSource {
  Future<AssetListModel> getAssetList(String namespace);
}

class AssetListRepositoryImpl extends BaseRepository implements AssetListRepository {
  /*
  final AssetListRemoteDataSource remoteDataSource;
  final AssetListLocalDataSource localDataSource;
*/
  AssetListRepositoryImpl({
    /*
    required this.remoteDataSource,
      required this.localDataSource,
*/
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<T>>> getAssetList<T extends AssetListModel>(
    String namespace,
    AssetListConstructor<T> constructor,
  ) async {
    try {
      if (T == CommonAssetListModel) {
        return Right(Result(data: loginAssetList.toNamespaceModel(constructor)));
      }
      return Right(Result(data: loginAssetList as T));
    } catch (error) {
      return Left(errorHandler.handle(error));
    }
  }
}
