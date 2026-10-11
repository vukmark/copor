import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/user/config/user_name_spaces.dart';

class UserPageTranslation extends TranslationModel {
  static const String namespaceStatic = UserNamespaces.User;

  const UserPageTranslation({required super.translationStringList});

  factory UserPageTranslation.fromModel(TranslationModel model) {
    return UserPageTranslation(translationStringList: model.translationStringList);
  }

  String get USERS => getTranslation('USERS');
  String get SEARCH_USER => getTranslation('SEARCH_USER');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get NAME => getTranslation('NAME');
  String get FIRST_NAME => getTranslation('FIRST_NAME');
  String get LAST_NAME => getTranslation('LAST_NAME');
  String get REQUIRED_FIRST_NAME_MESSAGE => getTranslation('REQUIRED_FIRST_NAME_MESSAGE');
  String get REQUIRED_LAST_NAME_MESSAGE => getTranslation('REQUIRED_LAST_NAME_MESSAGE');
  String get COLOR => getTranslation('COLOR');
  String get ACTIONS => getTranslation('ACTIONS');
  String get ADD => getTranslation('ADD');
  String get PUBLISHED => getTranslation('PUBLISHED');
  String get UNPUBLISHED => getTranslation('UNPUBLISHED');
  String get EDIT_USER => getTranslation('EDIT_USER');
  String get CREATE_USER => getTranslation('CREATE_USER');
  String get USER_NAME => getTranslation('USER_NAME');
  String get IS_PROGRESS_BAR_VISIBLE => getTranslation('IS_PROGRESS_BAR_VISIBLE');
  String get IS_PRIVATE => getTranslation('IS_PRIVATE');
  String get PUBLISH_STATUS => getTranslation('PUBLISH_STATUS');
  String get UNKNOWN => getTranslation('UNKNOWN');
  String get DESCRIPTION => getTranslation('DESCRIPTION');
  String get DELETE_MESSAGE => getTranslation('DELETE_MESSAGE');
  String get ID => getTranslation('ID');
  String get REQUIRED_NAME_MESSAGE => getTranslation('REQUIRED_NAME_MESSAGE');
  String get REQUIRED_COLOR_MESSAGE => getTranslation('REQUIRED_COLOR_MESSAGE');
  String get REQUIRED_DESCRIPTION_MESSAGE => getTranslation('REQUIRED_DESCRIPTION_MESSAGE');
  String get DELETE_USER_SUCCESS_MESSAGE => getTranslation('DELETE_USER_SUCCESS_MESSAGE');
  String get UPDATE_USER_SUCCESS_MESSAGE => getTranslation('UPDATE_USER_SUCCESS_MESSAGE');
  String get CREATE_USER_SUCCESS_MESSAGE => getTranslation('CREATE_USER_SUCCESS_MESSAGE');
  String get PICTURE_PATH => getTranslation('PICTURE_PATH');
  String get IS_DEFAULT_ROLE => getTranslation('IS_DEFAULT_ROLE');
  String get IS_ACTIVE => getTranslation('IS_ACTIVE');
  String get ROLE => getTranslation('ROLE');

  @override
  String get namespace => namespaceStatic;
}
