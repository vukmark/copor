import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_todo/src/config/to_do_namespaces.dart';

class TodoPageTranslation extends TranslationModel {
  static const String namespaceStatic = TodoNamespaces.Todo;

  const TodoPageTranslation({required super.translationStringList});

  factory TodoPageTranslation.fromModel(TranslationModel model) {
    return TodoPageTranslation(translationStringList: model.translationStringList);
  }

  String get SEARCH_TO_DO => getTranslation('SEARCH_TO_DO');
  String get TODO_DELETED => getTranslation('TODO_DELETED');
  String get CONFIRM_DELETION => getTranslation('CONFIRM_DELETION');
  String get DELETION_MESSAGE => getTranslation('DELETION_MESSAGE');
  String get SORT => getTranslation('SORT');
  String get FILTER => getTranslation('FILTER');
  String get NORMAL => getTranslation('NORMAL');
  String get HIGH => getTranslation('HIGH');
  String get URGENT => getTranslation('URGENT');
  String get TODO => getTranslation('TODO');
  String get STARTED => getTranslation('STARTED');
  String get HALFWAY => getTranslation('HALFWAY');
  String get ALMOST_DONE => getTranslation('ALMOST_DONE');
  String get FINISHED => getTranslation('FINISHED');
  String get DEFAULT_SORT => getTranslation('DEFAULT_SORT');
  String get PROGRESS_ASCENDING => getTranslation('PROGRESS_ASCENDING');
  String get PROGRESS_DESCENDING => getTranslation('PROGRESS_DESCENDING');
  String get TITLE_ASCENDING => getTranslation('TITLE_ASCENDING');
  String get TITLE_DESCENDING => getTranslation('TITLE_DESCENDING');
  String get PRIORITY_ASCENDING => getTranslation('PRIORITY_ASCENDING');
  String get PRIORITY_DESCENDING => getTranslation('PRIORITY_DESCENDING');
  String get DEADLINE_ASCENDING => getTranslation('DEADLINE_ASCENDING');
  String get DEADLINE_DESCENDING => getTranslation('DEADLINE_DESCENDING');
  String get ASCENDING => getTranslation('ASCENDING');
  String get DESCENDING => getTranslation('DESCENDING');
  String get PROGRESS => getTranslation('PROGRESS');
  String get PRIORITY => getTranslation('PRIORITY');
  String get DATE => getTranslation('DATE');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get SORT_BY => getTranslation('SORT_BY');
  String get TAGS => getTranslation('TAGS');
  String get NO_TAGS_ADDED_TO_THIS_TODO => getTranslation('NO_TAGS_ADDED_TO_THIS_TODO');
  String get SELECT_TAGS => getTranslation('SELECT_TAGS');
  String get ADD => getTranslation('ADD');
  String get DUE_DATE => getTranslation('DUE_DATE');
  String get TODAY => getTranslation('TODAY');
  String get TOMORROW => getTranslation('TOMORROW');
  String get THIS_WEEK => getTranslation('THIS_WEEK');
  String get THIS_MONTH => getTranslation('THIS_MONTH');
  String get ALL => getTranslation('ALL');
  String get TODO_UPDATED => getTranslation('TODO_UPDATED');
  String get LOADING => getTranslation('LOADING');
  String get ERROR_FETCHING_TO_DO => getTranslation('ERROR_FETCHING_TO_DO');
  String get ERROR_UPDATING_TO_DO => getTranslation('ERROR_UPDATING_TO_DO');
  String get ERROR_CREATING_TO_DO => getTranslation('ERROR_CREATING_TO_DO');
  String get NEW_TODO_CREATED => getTranslation('NEW_TODO_CREATED');
  String get DESCRIPTION => getTranslation('DESCRIPTION');
  String get ENTER_DESCRIPTION => getTranslation('ENTER_DESCRIPTION');
  String get ADD_TODO => getTranslation('ADD_TODO');
  String get EDIT_TODO => getTranslation('EDIT_TODO');
  String get SAVE => getTranslation('SAVE');
  String get CANCEL => getTranslation('CANCEL');
  String get DELETE => getTranslation('DELETE');
  String get EDIT => getTranslation('EDIT');
  String get SELECT_DATE => getTranslation('SELECT_DATE');
  String get ADD_NEW => getTranslation('ADD_NEW');
  String get YES => getTranslation('YES');
  String get NO => getTranslation('NO');
  String get TAG_NAME => getTranslation('TAG_NAME');
  String get DO_YOU_WANT_TO_DELETE_THIS_TAG => getTranslation('DO_YOU_WANT_TO_DELETE_THIS_TAG');
  String get EDIT_TAGS => getTranslation('EDIT_TAGS');
  String get ADD_TAG => getTranslation('ADD_TAG');
  String get YOU_DONT_HAVE_ANY_PRIVATE_TAGS => getTranslation('YOU_DONT_HAVE_ANY_PRIVATE_TAGS');
  String get CLICK_ON_THE_BUTTON_TO_CREATE_TAG =>
      getTranslation('CLICK_ON_THE_BUTTON_TO_CREATE_TAG');
  String get REQUIRED_TITLE_MESSAGE => getTranslation('REQUIRED_TITLE_MESSAGE');
  String get CREATE_TODO_SUCCESS_MESSAGE => getTranslation('CREATE_TODO_SUCCESS_MESSAGE');
  String get UPDATE_TODO_SUCCESS_MESSAGE => getTranslation('UPDATE_TODO_SUCCESS_MESSAGE');
  String get DELETE_TODO_SUCCESS_MESSAGE => getTranslation('DELETE_TODO_SUCCESS_MESSAGE');
  String get EMPTY_TODO_LIST_MESSAGE => getTranslation('EMPTY_TODO_LIST_MESSAGE');
  String get CREATE_FIRST_TODO_MESSAGE => getTranslation('CREATE_FIRST_TODO_MESSAGE');
  String get CREATED_BY => getTranslation('CREATED_BY');
  String get CREATED_FOR => getTranslation('CREATED_FOR');
  String get TYPE => getTranslation('TYPE');
  String get PRIVATE => getTranslation('PRIVATE');
  String get CLEAR => getTranslation('CLEAR');
  String get ACTIONS => getTranslation('ACTIONS');
  String get BACK_TO_TASK => getTranslation('BACK_TO_TASK');
  String get ATTACHMENTS => getTranslation('ATTACHMENTS');
  String get THIS_ITEM_INCLUDES_ATTACHMENT => getTranslation('THIS_ITEM_INCLUDES_ATTACHMENT');
  String get BROWSE_FILES => getTranslation('BROWSE_FILES');
  String get DROP_FILES_HERE_TO_UPLOAD => getTranslation('DROP_FILES_HERE_TO_UPLOAD');
  String get HISTORY => getTranslation('HISTORY');
  String get VIEW_TODO_CHANGE_HISTORY => getTranslation('VIEW_TODO_CHANGE_HISTORY');
  String get TODO_HISTORY => getTranslation('TODO_HISTORY');
  String get CLOSE => getTranslation('CLOSE');
  String get TRY_AGAIN => getTranslation('TRY_AGAIN');
  String get TODO_HISTORY_LOAD_ERROR => getTranslation('TODO_HISTORY_LOAD_ERROR');
  String get NO_TODO_HISTORY => getTranslation('NO_TODO_HISTORY');
  String get TODO_CREATED => getTranslation('TODO_CREATED');
  String get TITLE => getTranslation('TITLE');
  String get SCHEDULED_TIME => getTranslation('SCHEDULED_TIME');
  String get PINNED => getTranslation('PINNED');
  String get DISPLAYED_IN_CALENDAR => getTranslation('DISPLAYED_IN_CALENDAR');
  String get TAG_ADDED => getTranslation('TAG_ADDED');
  String get TAG_REMOVED => getTranslation('TAG_REMOVED');

  @override
  String get namespace => namespaceStatic;
}
