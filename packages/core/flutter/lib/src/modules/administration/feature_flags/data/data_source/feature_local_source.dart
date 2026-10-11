import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class FeatureLocalDataSourceImpl extends BaseLocalDataSource<FeatureListModel>
    implements FeatureLocalDataSource {
  FeatureLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<FeatureListModel> getFeatureList() async {
    return await getData(FeatureModel.namespaceStatic, null);
  }

  @override
  Future<void> setFeatureList(FeatureListModel featureList) async {
    return await saveData(featureList, null);
  }

  @override
  FeatureListModel fromJson(Map<String, dynamic> json) {
    return FeatureListModel.fromJson(json);
  }

  @override
  JSON toJson(FeatureListModel model) {
    return model.toJson();
  }
}
