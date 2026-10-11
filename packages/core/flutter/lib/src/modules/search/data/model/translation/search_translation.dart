import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/search/config/search_namespaces.dart';

class SearchPageTranslation extends TranslationModel {
  static const String namespaceStatic = SearchNamespaces.Search;

  const SearchPageTranslation({required super.translationStringList});

  factory SearchPageTranslation.fromModel(TranslationModel model) {
    return SearchPageTranslation(translationStringList: model.translationStringList);
  }
  String get URGENT => getTranslation('URGENT');
  String get HIGH => getTranslation('HIGH');
  String get NORMAL => getTranslation('NORMAL');
  String get LOW => getTranslation('LOW');
  String get STARTED => getTranslation('STARTED');
  String get ALMOST_DONE => getTranslation('ALMOST_DONE');
  String get FINISHED => getTranslation('FINISHED');
  String get HALF_WAY => getTranslation('HALF_WAY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get ALL => getTranslation('ALL');
  String get SEARCH => getTranslation('SEARCH');
  String get TO_DO => getTranslation('TO_DO');
  String get USERS => getTranslation('USERS');
  String get SHOW_MORE => getTranslation('SHOW_MORE');
  String get SHOW_LESS => getTranslation('SHOW_LESS');
  String get SORT => getTranslation('SORT');
  String get FILTER => getTranslation('FILTER');
  String get CLOUD => getTranslation('CLOUD');
  String get todos => getTranslation('TASKS');
  String get SORT_BY => getTranslation('SORT_BY');
  String get PRIORITY_HIGH_TO_LOW => getTranslation('PRIORITY_HIGH_TO_LOW');
  String get PRIORITY_LOW_TO_HIGH => getTranslation('PRIORITY_LOW_TO_HIGH');
  String get PROGRESS_FINISHED_FIRST => getTranslation('PROGRESS_FINISHED_FIRST');
  String get PROGRESS_STARTED_FIRST => getTranslation('PROGRESS_STARTED_FIRST');
  String get DATE_NEWEST_FIRST => getTranslation('DATE_CLOSEST_FIRST');
  String get DATE_OLDEST_FIRST => getTranslation('DATE_OLDEST_FIRST');
  String get PERSONAL => getTranslation('PERSONAL');
  String get OTHER_GROUPS => getTranslation('OTHER_GROUPS');
  String get PICTURE => getTranslation('PICTURE');
  String get VIDEO => getTranslation('VIDEO');
  String get AUDIO => getTranslation('AUDIO');
  String get PDF_FILE => getTranslation('PDF_FILE');
  String get DEFAULT_A_Z => getTranslation('DEFAULT_A_Z');
  String get FILTER_USERS_BY_ROLE => getTranslation('FILTER_USERS_BY_ROLE');
  String get DATE_CLOSEST_FIRST => getTranslation('DATE_CLOSEST_FIRST');
  String get DATE_FURTHEST_FIRST => getTranslation('DATE_FURTHEST_FIRST');
  String get FILTER_TASKS_BY_TAG => getTranslation('FILTER_TASKS_BY_TAG');
  String get SORT_CLOUD_FILES_BY => getTranslation('SORT_CLOUD_FILES_BY');
  String get FILTER_BY_LOCATION => getTranslation('FILTER_BY_LOCATION');
  String get FILTER_BY_FILE_TYPE => getTranslation('FILTER_BY_FILE_TYPE');
  String get FILTER_USERS => getTranslation('FILTER_USERS');
  String get FILTER_TO_DO => getTranslation('FILTER_TO_DO');
  String get FILTER_CLOUD => getTranslation('FILTER_CLOUD');
  String get LOOKING_FOR_SOMETHING => getTranslation('LOOKING_FOR_SOMETHING');
  String get NO_RESULTS_TRY_AGAIN => getTranslation('NO_RESULTS_TRY_AGAIN');
  String get EVENTS => getTranslation('EVENTS');

  @override
  String get namespace => namespaceStatic;
}
