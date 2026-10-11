import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/log/config/log_namespace.dart';

class LogPageTranslation extends TranslationModel {
  static const String namespaceStatic = LogNamespaces.Log;

  const LogPageTranslation({required super.translationStringList});

  factory LogPageTranslation.fromModel(TranslationModel model) {
    return LogPageTranslation(translationStringList: model.translationStringList);
  }

  String get ACTOR => getTranslation('ACTOR');
  String get ACTION_TYPE => getTranslation('ACTION_TYPE');
  String get TIMESTAMP => getTranslation('TIMESTAMP');
  String get GET_LOG_LIST => getTranslation('GET_LOG_LIST');
  String get SEARCH_USER => getTranslation('SEARCH_USER');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get SEARCH_LOGS => getTranslation('SEARCH_LOGS');

  @override
  String get namespace => namespaceStatic;
}
