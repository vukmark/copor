import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';

class StatePageTranslation extends TranslationModel {
  static const String namespaceStatic = ModelNamespaces.State;

  const StatePageTranslation({required super.translationStringList});

  factory StatePageTranslation.fromModel(TranslationModel model) {
    return StatePageTranslation(translationStringList: model.translationStringList);
  }

  String get STATE => getTranslation('STATE');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get ACTIONS => getTranslation('ACTIONS');
  String get NAME => getTranslation('NAME');
  String get SEARCH_STATE => getTranslation('SEARCH_STATE');
  String get STATE_ID => getTranslation('STATE_ID');
  String get FILTER => getTranslation('FILTER');
  String get STATUS => getTranslation('STATUS');
  String get ADD => getTranslation('ADD');
  String get NAME_REQUIRED => getTranslation('NAME_REQUIRED');
  String get CODE => getTranslation('CODE');
  String get CODE_REQUIRED => getTranslation('CODE_REQUIRED');
  String get COUNTRY_ID => getTranslation('COUNTRY_ID');
  String get COUNTRY_ID_REQUIRED => getTranslation('COUNTRY_ID_REQUIRED');
  String get COUNTRY => getTranslation('COUNTRY');
  String get EDIT_STATE => getTranslation('EDIT_STATE');
  String get CREATE_STATE => getTranslation('CREATE_STATE');
  String get ID => getTranslation('ID');
  String get DELETE_MESSAGE => getTranslation('DELETE_MESSAGE');
  String get DELETE_STATE_SUCCESS_MESSAGE => getTranslation('DELETE_STATE_SUCCESS_MESSAGE');
  String get CREATE_STATE_SUCCESS_MESSAGE => getTranslation('CREATE_STATE_SUCCESS_MESSAGE');
  String get UPDATE_STATE_SUCCESS_MESSAGE => getTranslation('UPDATE_STATE_SUCCESS_MESSAGE');

  @override
  String get namespace => namespaceStatic;
}
