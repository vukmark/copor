import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/tag/config/tag_name_spaces.dart';

class TagPageTranslation extends TranslationModel {
  static const String namespaceStatic = TagNamespaces.Tag;

  const TagPageTranslation({required super.translationStringList});

  factory TagPageTranslation.fromModel(TranslationModel model) {
    return TagPageTranslation(translationStringList: model.translationStringList);
  }

  String get TAGS => getTranslation('TAGS');
  String get SEARCH_TAG => getTranslation('SEARCH_TAG');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get FILTER => getTranslation('FILTER');
  String get NAME => getTranslation('NAME');
  String get COLOR => getTranslation('COLOR');
  String get ACTIONS => getTranslation('ACTIONS');
  String get ADD => getTranslation('ADD');
  String get PUBLISHED => getTranslation('PUBLISHED');
  String get UNPUBLISHED => getTranslation('UNPUBLISHED');
  String get EDIT_TAG => getTranslation('EDIT_TAG');
  String get CREATE_TAG => getTranslation('CREATE_TAG');
  String get TAG_NAME => getTranslation('TAG_NAME');
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
  String get DELETE_TAG_SUCCESS_MESSAGE => getTranslation('DELETE_TAG_SUCCESS_MESSAGE');
  String get CREATE_TAG_SUCCESS_MESSAGE => getTranslation('CREATE_TAG_SUCCESS_MESSAGE');
  String get UPDATE_TAG_SUCCESS_MESSAGE => getTranslation('UPDATE_TAG_SUCCESS_MESSAGE');
  String get TAG => getTranslation('TAG');

  @override
  String get namespace => namespaceStatic;
}
