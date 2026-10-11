import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'feature_remote_source.g.dart';

@RestApi()
abstract class FeatureRemoteDataSourceImpl implements FeatureRemoteDataSource {
  factory FeatureRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _FeatureRemoteDataSourceImpl;

  @override
  @GET('/feature-list')
  Future<FeatureListModel> getFeatureList();

  @override
  @GET('/feature-list/menu')
  Future<MenuListModel> getMenuList(@Header('Accept-Language') String languageCode);

  @override
  @GET('/feature-list/roles')
  Future<List<FeatureModel>> getFeatureListForRoles();

  @override
  @POST('/feature-list/set')
  Future<void> setFeatureList(@Body() List<FeatureModelDTO> featuresToUpdate);
}
