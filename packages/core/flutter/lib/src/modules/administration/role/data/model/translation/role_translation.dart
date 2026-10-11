import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/role/config/role_name_spaces.dart';

class RolePageTranslation extends TranslationModel {
  static const String namespaceStatic = RoleNamespaces.Role;

  const RolePageTranslation({required super.translationStringList});

  factory RolePageTranslation.fromModel(TranslationModel model) {
    return RolePageTranslation(translationStringList: model.translationStringList);
  }

  String get USER_GROUP => getTranslation('USER_GROUP');
  String get USER_ROLE => getTranslation('USER_ROLE');
  String get ROLE => getTranslation('ROLE');
  String get SEARCH_ROLES => getTranslation('SEARCH_ROLES');
  String get ACTIONS => getTranslation('ACTIONS');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get FILTER => getTranslation('FILTER');
  String get ADD => getTranslation('ADD');
  String get NAME => getTranslation('NAME');
  String get TYPE => getTranslation('TYPE');
  String get ADMIN => getTranslation('ADMIN');
  String get NAME_REQUIRED => getTranslation('NAME_REQUIRED');
  String get UNKNOWN => getTranslation('UNKNOWN');
  String get ROLE_TYPE => getTranslation('ROLE_TYPE');
  String get EDIT_USER_GROUP => getTranslation('EDIT_USER_GROUP');
  String get CREATE_USER_GROUP => getTranslation('CREATE_USER_GROUP');
  String get DELETE_MESSAGE => getTranslation('DELETE_MESSAGE');
  String get DELETE_USER_GROUP_SUCCESS_MESSAGE =>
      getTranslation('DELETE_USER_GROUP_SUCCESS_MESSAGE');
  String get CREATE_USER_GROUP_SUCCESS_MESSAGE =>
      getTranslation('CREATE_USER_GROUP_SUCCESS_MESSAGE');
  String get UPDATE_USER_GROUP_SUCCESS_MESSAGE =>
      getTranslation('UPDATE_USER_GROUP_SUCCESS_MESSAGE');

  @override
  String get namespace => namespaceStatic;
}
