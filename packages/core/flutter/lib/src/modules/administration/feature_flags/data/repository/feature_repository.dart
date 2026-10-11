import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';

abstract class FeatureRepository {
  Future<Either<Failure, Result<FeatureListModel>>> getFeatureList();
  Future<Either<Failure, Result<MenuListModel>>> getMenuList(String languageCode);
  Future<Either<Failure, Result<List<FeatureModel>>>> getFeatureListForRoles();
  Future<Either<Failure, Result<void>>> setFeatureList(List<FeatureModelDTO> featuresToUpdate);
}

abstract class FeatureLocalDataSource {
  Future<FeatureListModel> getFeatureList();
  Future<void> setFeatureList(FeatureListModel featureList);
}

abstract class FeatureRemoteDataSource {
  Future<FeatureListModel> getFeatureList();
  Future<MenuListModel> getMenuList(String languageCode);
  Future<List<FeatureModel>> getFeatureListForRoles();
  Future<void> setFeatureList(List<FeatureModelDTO> featuresToUpdate);
}
