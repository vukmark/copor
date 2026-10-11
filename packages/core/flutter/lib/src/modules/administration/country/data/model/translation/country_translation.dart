import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/country/config/country_name_spaces.dart';

class CountryPageTranslation extends TranslationModel {
  static const String namespaceStatic = CountryNamespaces.Country;

  const CountryPageTranslation({required super.translationStringList});

  factory CountryPageTranslation.fromModel(TranslationModel model) {
    return CountryPageTranslation(translationStringList: model.translationStringList);
  }

  String get COUNTRY => getTranslation('COUNTRY');
  String get DELETE => getTranslation('DELETE');
  String get EDIT => getTranslation('EDIT');
  String get SEARCH_COUNTRY => getTranslation('SEARCH_COUNTRY');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get NAME => getTranslation('NAME');
  String get CODE => getTranslation('CODE');
  String get ACTIONS => getTranslation('ACTIONS');
  String get SEARCH_USER => getTranslation('SEARCH_USER');
  String get ROLE => getTranslation('ROLE');
  String get FULL_NAME => getTranslation('FULL_NAME');
  String get DESCRIPTION => getTranslation('DESCRIPTION');
  String get ID => getTranslation('ID');
  String get ADD_COUNTRY => getTranslation('ADD_COUNTRY');
  String get CREATE_COUNTRY_SUCCESS_MESSAGE => getTranslation('CREATE_COUNTRY_SUCCESS_MESSAGE');
  String get UPDATE_COUNTRY_SUCCESS_MESSAGE => getTranslation('UPDATE_COUNTRY_SUCCESS_MESSAGE');
  String get DELETE_COUNTRY_SUCCESS_MESSAGE => getTranslation('DELETE_COUNTRY_SUCCESS_MESSAGE');
  String get CREATE_COUNTRY => getTranslation('CREATE_COUNTRY');
  String get EDIT_COUNTRY => getTranslation('EDIT_COUNTRY');
  String get REQUIRED_NAME_MESSAGE => getTranslation('REQUIRED_NAME_MESSAGE');
  String get REQUIRED_CODE_MESSAGE => getTranslation('REQUIRED_CODE_MESSAGE');
  String get YES => getTranslation('YES');
  String get NO => getTranslation('NO');
  String get CONFIRM_DELETION => getTranslation('CONFIRM_DELETION');
  String get DELETE_MESSAGE => getTranslation('DELETE_MESSAGE');
  String get STATUS => getTranslation('STATUS');
  String get STATES => getTranslation('STATES');
  String get STATE_NAME => getTranslation('STATE_NAME');
  String get STATE_CODE => getTranslation('STATE_CODE');
  String get NO_STATES_ADDED => getTranslation('NO_STATES_ADDED');
  String get ADD_STATE => getTranslation('ADD_STATE');
  String get CANCEL => getTranslation('CANCEL');
  String get FIELD_CANT_BE_EMPTY => getTranslation('FIELD_CANT_BE_EMPTY');
  String get FINISH_EDITING_FIRST => getTranslation('FINISH_EDITING_FIRST');
  String get FINISH_CREATING_FIRST => getTranslation('FINISH_CREATING_FIRST');
  String get DELETE_STATE_MESSAGE => getTranslation('DELETE_STATE_MESSAGE');
  String get DEFAULT_SORT => getTranslation('DEFAULT_SORT');
  String get NAME_ASCENDING => getTranslation('NAME_ASCENDING');
  String get NAME_DESCENDING => getTranslation('NAME_DESCENDING');
  String get STATUS_ASCENDING => getTranslation('STATUS_ASCENDING');
  String get STATUS_DESCENDING => getTranslation('STATUS_DESCENDING');
  String get ALL => getTranslation('ALL');
  String get PUBLISHED => getTranslation('PUBLISHED');
  String get UNPUBLISHED => getTranslation('UNPUBLISHED');

  @override
  String get namespace => namespaceStatic;
}
