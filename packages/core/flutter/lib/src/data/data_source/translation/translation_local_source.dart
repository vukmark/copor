import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository_impl.dart';
import 'package:copor_core/src/utils/typedef.dart';

class TranslationLocalDataSourceImpl extends BaseLocalDataSource<TranslationModel>
    implements TranslationLocalDataSource {
  TranslationLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  TranslationModel fromJson(Map<String, dynamic> json) {
    return TranslationModel.fromJson(json);
  }

  @override
  JSON toJson(TranslationModel model) {
    return model.toJson();
  }

  @override
  Future<void> saveTranslation(TranslationModel translationModel, String languageCode) async {
    return await saveData(translationModel, languageCode);
  }

  Future<void> removeTranslation(String namespace, String lang) async {
    return await removeData(namespace, lang);
  }

  @override
  Future<TranslationModel> getTranslation(String namespace, String languageCode) async {
    return await getData(namespace, languageCode);
  }
}
