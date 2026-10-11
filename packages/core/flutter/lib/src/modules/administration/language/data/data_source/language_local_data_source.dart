import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/language/data/repository/language_repository_impl.dart';
import 'package:copor_core/src/utils/typedef.dart';

class LanguageLocalDataSourceImpl extends BaseListLocalDataSource<LanguageModel>
    implements LanguageLocalDataSource {
  LanguageLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<LanguageModel>> getLanguageList() async {
    return await getData(LanguageModel.namespaceStatic, null);
  }

  @override
  Future<void> setLanguageList(List<LanguageModel> languageList) async {
    await saveData(languageList, LanguageModel.namespaceStatic);
  }

  @override
  JSON toJsonSingle(LanguageModel model) {
    return model.toJson();
  }

  @override
  LanguageModel fromJsonSingle(JSON json) {
    return LanguageModel.fromJson(json);
  }
}
