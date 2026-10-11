import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/language/config/language_name_spaces.dart';

class LanguagePageTranslation extends TranslationModel {
  static const String namespaceStatic = LanguageModelNamespaces.Language;

  const LanguagePageTranslation({required super.translationStringList});

  factory LanguagePageTranslation.fromModel(TranslationModel model) {
    return LanguagePageTranslation(translationStringList: model.translationStringList);
  }

  String get LANGUAGE => getTranslation('LANGUAGE');
  String get LANGUAGES => getTranslation('LANGUAGES');
  String get SEARCH_LANGUAGE => getTranslation('SEARCH_LANGUAGE');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get NAME => getTranslation('NAME');
  String get CODE => getTranslation('CODE');
  String get ACTIONS => getTranslation('ACTIONS');
  String get ADD_LANGUAGE => getTranslation('ADD_LANGUAGE');
  String get NATIVE_NAME => getTranslation('NATIVE_NAME');
  String get DELETE_LANGUAGE_MESSAGE => getTranslation('DELETE_LANGUAGE_MESSAGE');

  @override
  String get namespace => namespaceStatic;
}
