import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class AssetListRepository {
  Future<Either<Failure, Result<T>>> getAssetList<T extends AssetListModel>(
    String modelNamespace,
    AssetListConstructor<T> constructor,
  );
}
