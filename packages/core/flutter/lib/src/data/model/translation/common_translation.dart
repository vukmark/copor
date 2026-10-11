import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';

class CommonTranslation extends TranslationModel {
  static const String namespaceStatic = ModelNamespaces.Common;

  const CommonTranslation({required super.translationStringList});

  factory CommonTranslation.fromModel(TranslationModel model) {
    return CommonTranslation(translationStringList: model.translationStringList);
  }

  String get CONTENT => getTranslation('CONTENT');
  String get DELETION_REQUESTS => getTranslation('DELETION_REQUESTS');
  String get EMAIL_SENT_SUCCESSFULLY => getTranslation('EMAIL_SENT_SUCCESSFULLY');
  String get DIKI => getTranslation('DIKI');
  String get TOGGLE_ALL => getTranslation('TOGGLE_ALL');
  String get PROGRESS => getTranslation('PROGRESS');
  String get TRUE => getTranslation('TRUE');
  String get FALSE => getTranslation('FALSE');
  String get CLOSE => getTranslation('CLOSE');
  String get EXPAND => getTranslation('EXPAND');
  String get COLLAPSE => getTranslation('COLLAPSE');
  String get PASSWORD_VISIBILITY => getTranslation('PASSWORD_VISIBILITY');
  String get END_CALL => getTranslation('END_CALL');
  String get START_VIDEO_CALL => getTranslation('START_VIDEO_CALL');
  String get SEND => getTranslation('SEND');
  String get MENU => getTranslation('MENU');
  String get BACK => getTranslation('BACK');
  String get CURRENT_PERIOD => getTranslation('CURRENT_PERIOD');
  String get TENANT_ACTIVATED_SUCCESSFULLY => getTranslation('TENANT_ACTIVATED_SUCCESSFULLY');
  String get NAME => getTranslation('NAME');
  String get FIRST_NAME => getTranslation('FIRST_NAME');
  String get LAST_NAME => getTranslation('LAST_NAME');
  String get EMAIL => getTranslation('EMAIL');
  String get FROM => getTranslation('FROM');
  String get TO => getTranslation('TO');
  String get CREATE_BASE => getTranslation('CREATE_BASE');
  String get EDIT_BASE => getTranslation('EDIT_BASE');
  String get CREATE_BRANCH => getTranslation('CREATE_BRANCH');
  String get EDIT_BRANCH => getTranslation('EDIT_BRANCH');
  String get SUBMIT => getTranslation('SUBMIT');
  String get COPIED_TO_CLIPBOARD => getTranslation('COPIED_TO_CLIPBOARD');
  String get COPY => getTranslation('COPY');
  String get COPY_TO_CLIPBOARD => getTranslation('COPY_TO_CLIPBOARD');
  String get TODO => getTranslation('TODO');
  String get VU_MEET => getTranslation('VU_MEET');
  String get NEWS => getTranslation('NEWS');
  String get PEOPLE => getTranslation('PEOPLE');
  String get GROUPS => getTranslation('GROUPS');
  String get CONTACTS => getTranslation('CONTACTS');
  String get FEATURE_FLAGS => getTranslation('FEATURE_FLAGS');
  String get PERMISSIONS => getTranslation('PERMISSIONS');
  String get TOOLS => getTranslation('TOOLS');
  String get TALKIE => getTranslation('TALKIE');
  String get BULLETIN => getTranslation('BULLETIN');
  String get HELP => getTranslation('HELP');
  String get SETTINGS => getTranslation('SETTINGS');
  String get LOGOUT => getTranslation('LOGOUT');
  String get LOGIN => getTranslation('LOGIN');
  String get REGISTRATION => getTranslation('REGISTRATION');
  String get CREATE_AN_ACCOUNT => getTranslation('CREATE_AN_ACCOUNT');
  String get WELCOME_TO => getTranslation('WELCOME_TO');
  String get SEARCH => getTranslation('SEARCH');
  String get MY_ACCOUNT => getTranslation('MY_ACCOUNT');
  String get CLOUD => getTranslation('CLOUD');
  String get AI_CHAT => getTranslation('AI_CHAT');
  String get DOCU => getTranslation('DOCU');
  String get CONTACT => getTranslation('CONTACT');
  String get TENANTS => getTranslation('TENANTS');
  String get COUNTRY => getTranslation('COUNTRY');
  String get ROLE => getTranslation('ROLE');
  String get USER_GROUPS => getTranslation('USER_GROUPS');
  String get LANGUAGES => getTranslation('LANGUAGES');
  String get NATIVE_LANGUAGES => getTranslation('NATIVE_LANGUAGES');
  String get REGIONS => getTranslation('REGIONS');
  String get REGION_CITIES => getTranslation('REGION_CITIES');
  String get STATE => getTranslation('STATE');
  String get TAGS => getTranslation('TAGS');
  String get MINISTRIES => getTranslation('MINISTRIES');
  String get CONTRACT_TYPES => getTranslation('CONTRACT_TYPES');
  String get CONTENT_ITEM => getTranslation('CONTENT_ITEM');
  String get AI_CONTEXT_ITEM => getTranslation('AI_CONTEXT_ITEM');
  String get DELETE_USER => getTranslation('DELETE_USER');
  String get YOU_HAVE_BEEN_LOGGED_OUT => getTranslation('LOGGED_OUT_MESSAGE');
  String get LOGIN_AGAIN => getTranslation('LOGIN_AGAIN');
  String get SELECT_LANGUAGE => getTranslation('SELECT_LANGUAGE');
  String get CREATE => getTranslation('CREATE');
  String get UPDATE => getTranslation('UPDATE');
  String get ACTIONS => getTranslation('ACTIONS');
  String get EDIT => getTranslation('EDIT');
  String get DELETE => getTranslation('DELETE');
  String get ENTER_VALID_EMAIL => getTranslation('ENTER_VALID_EMAIL');
  String get ENTER_VALID_POSTAL_CODE => getTranslation('ENTER_VALID_POSTAL_CODE');
  String get ENTER_VALID_COORDINATES => getTranslation('ENTER_VALID_COORDINATES');
  String get YES => getTranslation('YES');
  String get NO => getTranslation('NO');
  String get CONFIRM_DELETION => getTranslation('CONFIRM_DELETION');
  String get DELETE_ITEM_MESSAGE => getTranslation('DELETE_ITEM_MESSAGE');
  String get ITEM_DELETED_MESSAGE => getTranslation('ITEM_DELETED_MESSAGE');
  String get PUBLISHED => getTranslation('PUBLISHED');
  String get UNPUBLISHED => getTranslation('UNPUBLISHED');
  String get DRAFT => getTranslation('DRAFT');
  String get NORMAL => getTranslation('NORMAL');
  String get HIGH => getTranslation('HIGH');
  String get URGENT => getTranslation('URGENT');
  String get STARTED => getTranslation('STARTED');
  String get HALFWAY => getTranslation('HALFWAY');
  String get ALMOST_DONE => getTranslation('ALMOST_DONE');
  String get FINISHED => getTranslation('FINISHED');
  String get ADMIN => getTranslation('ADMIN');
  String get USER => getTranslation('USER');
  String get SUPER_ADMIN => getTranslation('SUPER_ADMIN');
  String get SELECT_USER_ROLE => getTranslation('SELECT_USER_ROLE');
  String get DUE_DATE => getTranslation('DUE_DATE');
  String get CANCEL => getTranslation('CANCEL');
  String get SELECT_DATE => getTranslation('SELECT_DATE');
  String get SELECT_TIME => getTranslation('SELECT_TIME');
  String get HORIZONTAL => getTranslation('HORIZONTAL');
  String get VERTICAL => getTranslation('VERTICAL');
  String get EDIT_TODO => getTranslation('EDIT_TODO');
  String get ADD_TODO => getTranslation('ADD_TODO');
  String get SAVE => getTranslation('SAVE');
  String get SAVE_SMTP => getTranslation('SAVE_SMTP');
  String get AI_ASSIST => getTranslation('AI_ASSISTANCE');
  String get EDIT_COUNTRY => getTranslation('EDIT_COUNTRY');
  String get ADD_COUNTRY => getTranslation('ADD_COUNTRY');
  String get ABOUT => getTranslation('ABOUT');
  String get VERSION => getTranslation('VERSION');
  String get PUBLISHED_APP => getTranslation('PUBLISHED_APP');
  String get COPYRIGHT => getTranslation('COPYRIGHT');
  String get LICENSE => getTranslation('LICENSE');
  String get SUPPORT => getTranslation('SUPPORT');
  String get POLICY => getTranslation('POLICY');
  String get IMPRESSUM => getTranslation('IMPRESSUM');
  String get CREATE_TAG => getTranslation('CREATE_TAG');
  String get EDIT_TAG => getTranslation('EDIT_TAG');
  String get TAG => getTranslation('TAG');
  String get EDIT_TENANT => getTranslation('EDIT_TENANT');
  String get ADD_REGION => getTranslation('ADD_REGION');
  String get EDIT_REGION => getTranslation('EDIT_REGION');
  String get ADD_USER => getTranslation('ADD_USER');
  String get EDIT_USER => getTranslation('ADD_USER');
  String get ADD_ROLE => getTranslation('ADD_ROLE');
  String get EDIT_ROLE => getTranslation('EDIT_ROLE');
  String get EDIT_PROFILE => getTranslation('EDIT_PROFILE');
  String get EDIT_PASSWORD => getTranslation('EDIT_PASSWORD');
  String get PASSWORD_REQUIREMENT_MIN_LENGTH => getTranslation('PASSWORD_REQUIREMENT_MIN_LENGTH');
  String get PASSWORD_REQUIREMENT_MAX_LENGTH => getTranslation('PASSWORD_REQUIREMENT_MAX_LENGTH');
  String get PASSWORD_REQUIREMENT_MIN_LOWERCASE =>
      getTranslation('PASSWORD_REQUIREMENT_MIN_LOWERCASE');
  String get PASSWORD_REQUIREMENT_MIN_UPPERCASE =>
      getTranslation('PASSWORD_REQUIREMENT_MIN_UPPERCASE');
  String get PASSWORD_REQUIREMENT_MIN_DIGITS => getTranslation('PASSWORD_REQUIREMENT_MIN_DIGITS');
  String get PASSWORD_REQUIREMENT_MIN_SPECIAL => getTranslation('PASSWORD_REQUIREMENT_MIN_SPECIAL');
  String get PASSWORD_REQUIREMENT_NO_SPACES => getTranslation('PASSWORD_REQUIREMENT_NO_SPACES');
  String get PASSWORD_REQUIREMENT_NO_USERNAME => getTranslation('PASSWORD_REQUIREMENT_NO_USERNAME');
  String get PASSWORD_REQUIREMENT_NO_EMAIL_OR_NAME =>
      getTranslation('PASSWORD_REQUIREMENT_NO_EMAIL_OR_NAME');
  String get PASSWORD_REQUIREMENT_NOT_COMMON => getTranslation('PASSWORD_REQUIREMENT_NOT_COMMON');
  String get PASSWORD_REQUIREMENT_MAX_REPEATED =>
      getTranslation('PASSWORD_REQUIREMENT_MAX_REPEATED');
  String get PASSWORD_RECENTLY_USED => getTranslation('PASSWORD_RECENTLY_USED');
  String get PASSWORD_DO_NOT_MATCH => getTranslation('PASSWORD_DO_NOT_MATCH');
  String get LOGS => getTranslation('LOGS');
  String get VIEW_LOG_DATA => getTranslation('VIEW_LOG_DATA');
  String get COLOR_RED => getTranslation('COLOR_RED');
  String get COLOR_GREEN => getTranslation('COLOR_GREEN');
  String get COLOR_BLUE => getTranslation('COLOR_BLUE');
  String get COLOR_YELLOW => getTranslation('COLOR_YELLOW');
  String get COLOR_BLACK => getTranslation('COLOR_BLACK');
  String get COLOR_WHITE => getTranslation('COLOR_WHITE');
  String get COLOR_PINK => getTranslation('COLOR_PINK');
  String get COLOR_PURPLE => getTranslation('COLOR_PURPLE');
  String get COLOR_DEEP_PURPLE => getTranslation('COLOR_DEEP_PURPLE');
  String get COLOR_INDIGO => getTranslation('COLOR_INDIGO');
  String get COLOR_LIGHT_BLUE => getTranslation('COLOR_LIGHT_BLUE');
  String get COLOR_CYAN => getTranslation('COLOR_CYAN');
  String get COLOR_TEAN => getTranslation('COLOR_TEAN');
  String get COLOR_LIGHT_GREEN => getTranslation('COLOR_LIGHT_GREEN');
  String get COLOR_LIME => getTranslation('COLOR_LIME');
  String get COLOR_AMBER => getTranslation('COLOR_AMBER');
  String get COLOR_ORANGE => getTranslation('COLOR_ORANGE');
  String get COLOR_DEEP_ORANGE => getTranslation('COLOR_DEEP_ORANGE');
  String get COLOR_BROWN => getTranslation('COLOR_BROWN');
  String get COLOR_GREY => getTranslation('COLOR_GREY');
  String get ACCESS_DENIED => getTranslation('ACCESS_DENIED');
  String get INSUFFICIENT_PERMISSIONS => getTranslation('INSUFFICIENT_PERMISSIONS');
  String get CONTACT_ADMINISTRATOR => getTranslation('CONTACT_ADMINISTRATOR');
  String get ADMINISTRATION_DASHBOARD => getTranslation('ADMINISTRATION_DASHBOARD');
  String get ADMINISTRATION_DASHBOARD_SUBTITLE =>
      getTranslation('ADMINISTRATION_DASHBOARD_SUBTITLE');
  String get EDUCATIONAL_CONTENTS => getTranslation('EDUCATIONAL_CONTENTS');
  String get USERS => getTranslation('USERS');
  String get SYSTEM_AND_ACCESS_CATEGORY => getTranslation('SYSTEM_AND_ACCESS_CATEGORY');
  String get CREATE_CONTRACT_TYPE => getTranslation('CREATE_CONTRACT_TYPE');
  String get EDIT_CONTRACT_TYPE => getTranslation('EDIT_CONTRACT_TYPE');
  String get ADMINISTRATION => getTranslation('ADMINISTRATION');
  String get PAGE_NOT_FOUND => getTranslation('PAGE_NOT_FOUND');
  String get RETURN_TO_HOME => getTranslation('RETURN_TO_HOME');
  String get CHANGE_LOG => getTranslation('CHANGE_LOG');
  String get VERSION_HISTORY => getTranslation('VERSION_HISTORY');
  String get MOTTO => getTranslation('MOTTO');
  String get NO_VERSION_HISTORY => getTranslation('NO_VERSION_HISTORY');
  String get COULD_NOT_LOAD_CHANGELOG => getTranslation('COULD_NOT_LOAD_CHANGELOG');
  String get DOWNLOADS => getTranslation('DOWNLOADS');
  String get DOWNLOAD => getTranslation('DOWNLOAD');
  String get COULD_NOT_LOAD_URL => getTranslation('COULD_NOT_LOAD_URL');
  String get SYSTEM => getTranslation('SYSTEM');
  String get CONTACT_MANAGER_TITLE => getTranslation('CONTACT_MANAGER_TITLE');
  String get PRIVACY_POLICY => getTranslation('PRIVACY_POLICY');
  String get CLEAR_ALL => getTranslation('CLEAR_ALL');
  String get ASCENDING => getTranslation('ASCENDING');
  String get DESCENDING => getTranslation('DESCENDING');
  String get NO_SORT_OPTIONS => getTranslation('NO_SORT_OPTIONS');
  String get DEFAULT_SORT => getTranslation('DEFAULT_SORT');
  String get COLOR_NAVY => getTranslation('COLOR_NAVY');
  String get COLOR_APRICOT => getTranslation('COLOR_APRICOT');
  String get COLOR_OLIVE => getTranslation('COLOR_OLIVE');
  String get COLOR_MINT => getTranslation('COLOR_MINT');
  String get COLOR_MAROON => getTranslation('COLOR_MAROON');
  String get COLOR_BEIGE => getTranslation('COLOR_BEIGE');
  String get COLOR_LAVENDER => getTranslation('COLOR_LAVENDER');
  String get COLOR_TEAL => getTranslation('COLOR_TEAL');
  String get COLOR_MAGENTA => getTranslation('COLOR_MAGENTA');
  String get NO_ITEMS_TO_DISPLAY => getTranslation('NO_ITEMS_TO_DISPLAY');
  String get TOPIC => getTranslation('TOPIC');
  String get OTHER => getTranslation('OTHER');
  String get PERSONAL_DATA => getTranslation('PERSONAL_DATA');
  String get PROFILE_UPDATED_SUCCESS => getTranslation('PROFILE_UPDATED_SUCCESS');
  String get ADD => getTranslation('ADD');
  String get SORT_BY => getTranslation('SORT_BY');
  String get FILTER_BY => getTranslation('FILTER_BY');
  String get EDIT_PERSONAL_DATA => getTranslation('EDIT_PERSONAL_DATA');
  String get NO_RESULTS_FOUND => getTranslation('NO_RESULTS_FOUND');
  String get NO_DATA_FOUND => getTranslation('NO_DATA_FOUND');
  String get NO_DESCRIPTION_AVAILABLE => getTranslation('NO_DESCRIPTION_AVAILABLE');
  String get CALENDAR => getTranslation('CALENDAR');
  String get ACCESSIBILITY_YES_ENABLED => getTranslation('ACCESSIBILITY_YES_ENABLED');
  String get ACCESSIBILITY_NO_DISABLED => getTranslation('ACCESSIBILITY_NO_DISABLED');
  String get ACCESSIBILITY_CURRENT_VERSION => getTranslation('ACCESSIBILITY_CURRENT_VERSION');
  String get ACCESSIBILITY_NORMAL_PRIORITY => getTranslation('ACCESSIBILITY_NORMAL_PRIORITY');
  String get ACCESSIBILITY_HIGH_PRIORITY => getTranslation('ACCESSIBILITY_HIGH_PRIORITY');
  String get ACCESSIBILITY_URGENT_PRIORITY => getTranslation('ACCESSIBILITY_URGENT_PRIORITY');
  String get ACCESSIBILITY_TO_DO => getTranslation('ACCESSIBILITY_TO_DO');
  String get ACCESSIBILITY_WORK_STARTED => getTranslation('ACCESSIBILITY_WORK_STARTED');
  String get ACCESSIBILITY_HALFWAY => getTranslation('ACCESSIBILITY_HALFWAY');
  String get ACCESSIBILITY_ALMOST_DONE => getTranslation('ACCESSIBILITY_ALMOST_DONE');
  String get ACCESSIBILITY_FINISHED => getTranslation('ACCESSIBILITY_FINISHED');
  String get ACCESSIBILITY_MORE_INFO => getTranslation('ACCESSIBILITY_MORE_INFO');
  String get ACCESSIBILITY_SORTED_ASC => getTranslation('ACCESSIBILITY_SORTED_ASC');
  String get ACCESSIBILITY_SORTED_DESC => getTranslation('ACCESSIBILITY_SORTED_DESC');
  String get ACCESSIBILITY_SORT_OPTIONS => getTranslation('ACCESSIBILITY_SORT_OPTIONS');
  String get ACCESSIBILITY_ERROR => getTranslation('ACCESSIBILITY_ERROR');
  String get ACCESSIBILITY_SHARE_FILES => getTranslation('ACCESSIBILITY_SHARE_FILES');
  String get ACCESSIBILITY_CLOSE_DIALOG => getTranslation('ACCESSIBILITY_CLOSE_DIALOG');
  String get ACCESSIBILITY_SHARE => getTranslation('ACCESSIBILITY_SHARE');
  String get ACCESSIBILITY_DOWNLOAD => getTranslation('ACCESSIBILITY_DOWNLOAD');
  String get ACCESSIBILITY_GROUP_AVATAR => getTranslation('ACCESSIBILITY_GROUP_AVATAR');
  String get ACCESSIBILITY_UPLOAD_FILES => getTranslation('ACCESSIBILITY_UPLOAD_FILES');
  String get ACCESSIBILITY_EDIT => getTranslation('ACCESSIBILITY_EDIT');
  String get ACCESSIBILITY_DELETE => getTranslation('ACCESSIBILITY_DELETE');
  String get ACCESSIBILITY_HANG_UP => getTranslation('ACCESSIBILITY_HANG_UP');
  String get ACCESSIBILITY_VIDEO_CALL => getTranslation('ACCESSIBILITY_VIDEO_CALL');
  String get ACCESSIBILITY_AVATAR_UPLOAD => getTranslation('ACCESSIBILITY_AVATAR_UPLOAD');
  String get ACCESSIBILITY_ADD_PHOTO => getTranslation('ACCESSIBILITY_ADD_PHOTO');
  String get ACCESSIBILITY_EDIT_PHOTO => getTranslation('ACCESSIBILITY_EDIT_PHOTO');
  String get ACCESSIBILITY_DELETE_AVATAR => getTranslation('ACCESSIBILITY_DELETE_AVATAR');
  String get SYSTEM_SETTINGS => getTranslation('SYSTEM_SETTINGS');
  String get EDIT_SYSTEM_SETTINGS => getTranslation('EDIT_SYSTEM_SETTINGS');
  String get UPDATE_SUCCESS_MESSAGE => getTranslation('UPDATE_SUCCESS_MESSAGE');
  String get CREATE_SUCCESS_MESSAGE => getTranslation('CREATE_SUCCESS_MESSAGE');
  String get CONTRACTS_SIGNED_SUCCESS => getTranslation('CONTRACTS_SIGNED_SUCCESS');
  String get APP_INSTALLATION_MESSAGE => getTranslation('APP_INSTALLATION_MESSAGE');
  String get APP_DOWNLOAD => getTranslation('APP_DOWNLOAD');
  String get CONFIRM => getTranslation('CONFIRM');
  String get ARE_YOU_SURE_YOU_WANT_TO_UPDATE => getTranslation('ARE_YOU_SURE_YOU_WANT_TO_UPDATE');
  String get FEATURE_FLAGS_SAVED => getTranslation('FEATURE_FLAGS_SAVED');
  String get NO_FEATURES_FOUND => getTranslation('NO_FEATURES_FOUND');
  String get FEATURE => getTranslation('FEATURE');
  String get GLOBAL => getTranslation('GLOBAL');
  String get DISCARD => getTranslation('DISCARD');
  String get USER_GROUP_PERMISSION => getTranslation('USER_GROUP_PERMISSION');
  String get ROLE_PERMISSION => getTranslation('ROLE_PERMISSION');
  String get USER_GROUP => getTranslation('USER_GROUP');
  String get UNSAVED_CHANGES => getTranslation('UNSAVED_CHANGES');
  String get UNSAVED_ROLE_CHANGES_MESSAGE => getTranslation('UNSAVED_ROLE_CHANGES_MESSAGE');
  String get UNSAVED_PERMISSION_CHANGES_MESSAGE =>
      getTranslation('UNSAVED_PERMISSION_CHANGES_MESSAGE');
  String get MISSING_PERMISSION_DEPENDENCIES_TITLE =>
      getTranslation('MISSING_PERMISSION_DEPENDENCIES_TITLE');
  String get MISSING_PERMISSION_DEPENDENCIES_MESSAGE =>
      getTranslation('MISSING_PERMISSION_DEPENDENCIES_MESSAGE');
  String get PERMISSION_DEPENDENCY_NEEDS_ENABLING_HINT =>
      getTranslation('PERMISSION_DEPENDENCY_NEEDS_ENABLING_HINT');
  String get PERMISSION_DEPENDENCY_NEEDS_DISABLING_HINT =>
      getTranslation('PERMISSION_DEPENDENCY_NEEDS_DISABLING_HINT');
  String get PERMISSION_DEPENDENCY_REENABLE_SUGGESTION_HINT =>
      getTranslation('PERMISSION_DEPENDENCY_REENABLE_SUGGESTION_HINT');
  String get PERMISSION_ASSISTANT => getTranslation('PERMISSION_ASSISTANT');
  String get PERMISSION_ASSISTANT_TOOLTIP => getTranslation('PERMISSION_ASSISTANT_TOOLTIP');
  String get PERMISSION_DEPENDS_ON_LABEL => getTranslation('PERMISSION_DEPENDS_ON_LABEL');
  String get PERMISSION_STILL_REQUIRED_BY_LABEL =>
      getTranslation('PERMISSION_STILL_REQUIRED_BY_LABEL');
  String get PERMISSION_REENABLE_SUGGESTION_LABEL =>
      getTranslation('PERMISSION_REENABLE_SUGGESTION_LABEL');
  String get NO_PERMISSION_DEPENDENCIES => getTranslation('NO_PERMISSION_DEPENDENCIES');
  String get PERMISSION_DEPENDENCIES_TOOLTIP => getTranslation('PERMISSION_DEPENDENCIES_TOOLTIP');
  String get APPLY_PERMISSION_TOOLTIP => getTranslation('APPLY_PERMISSION_TOOLTIP');
  String get APPLY_PERMISSION_TO_TITLE => getTranslation('APPLY_PERMISSION_TO_TITLE');
  String get APPLY_PERMISSION_SUCCESS_MESSAGE => getTranslation('APPLY_PERMISSION_SUCCESS_MESSAGE');
  String get APPLY_PERMISSION_FAILURE_MESSAGE => getTranslation('APPLY_PERMISSION_FAILURE_MESSAGE');
  String get APPLY => getTranslation('APPLY');
  String get SAVE_ANYWAY => getTranslation('SAVE_ANYWAY');
  String get PERMISSION => getTranslation('PERMISSION');
  String get SCOPE => getTranslation('SCOPE');
  String get EFFECT => getTranslation('EFFECT');
  String get ALL => getTranslation('ALL');
  String get OWN => getTranslation('OWN');
  String get TENANT => getTranslation('TENANT');
  String get REGION => getTranslation('REGION');
  String get CUSTOM => getTranslation('CUSTOM');
  String get ALLOW => getTranslation('ALLOW');
  String get DENY => getTranslation('DENY');
  String get INHERIT => getTranslation('INHERIT');
  String get ROLE_DEFAULT => getTranslation('ROLE_DEFAULT');
  String get VIDEO_CALL_MOBILE_ONLY => getTranslation('VIDEO_CALL_MOBILE_ONLY');
  String get NO_INTERNET_CONNECTION => getTranslation('NO_INTERNET_CONNECTION');
  String get SERVER_UNAVAILABLE_MESSAGE => getTranslation('SERVER_UNAVAILABLE_MESSAGE');
  String get NO_INTERNET_MESSAGE => getTranslation('NO_INTERNET_MESSAGE');
  String get ACTIVATION => getTranslation('ACTIVATION');
  String get PREVIEW => getTranslation('PREVIEW');
  String get CALLING => getTranslation('CALLING');
  String get INCOMING_CALL_STATUS => getTranslation('INCOMING_CALL_STATUS');
  String get DIDNT_ANSWER => getTranslation('DIDNT_ANSWER');
  String get ANSWER => getTranslation('ANSWER');
  String get DECLINE => getTranslation('DECLINE');
  String get CALL_AGAIN => getTranslation('CALL_AGAIN');
  String get RETURN_TO_CALL => getTranslation('RETURN_TO_CALL');
  String get CALL_ENDED_LABEL => getTranslation('CALL_ENDED_LABEL');
  String get CALL_DECLINED => getTranslation('CALL_DECLINED');
  String get LEFT_CALL => getTranslation('LEFT_CALL');
  String get GROUP_CALL_MISSING_MEMBERS => getTranslation('GROUP_CALL_MISSING_MEMBERS');
  String get ACCOUNT_DELETION_INFO => getTranslation('ACCOUNT_DELETION_INFO');
  String get APPLIED_FILTERS => getTranslation('APPLIED_FILTERS');
  String get UPLOADING_FILES => getTranslation('UPLOADING_FILES');
  String get INACTIVE_USER => getTranslation('INACTIVE_USER');
  String get EXCUSED => getTranslation('EXCUSED');
  String get UNEXCUSED => getTranslation('UNEXCUSED');
  String get CREATE_ROLE => getTranslation('CREATE_ROLE');
  String get CREATE_USER => getTranslation('CREATE_USER');
  String get EDIT_USER_GROUP => getTranslation('EDIT_USER_GROUP');
  String get CREATE_USER_GROUP => getTranslation('CREATE_USER_GROUP');
  String get CREATE_REGION => getTranslation('CREATE_REGION');
  String get EDIT_REGION_CITY => getTranslation('EDIT_REGION_CITY');
  String get CREATE_REGION_CITY => getTranslation('CREATE_REGION_CITY');
  String get CREATE_TENANT => getTranslation('CREATE_TENANT');
  String get CREATE_COUNTRY => getTranslation('CREATE_COUNTRY');
  String get EDIT_DELETION_REQUEST => getTranslation('EDIT_DELETION_REQUEST');
  String get CREATE_DELETION_REQUEST => getTranslation('CREATE_DELETION_REQUEST');
  String get EDIT_CONTENT_ITEM => getTranslation('EDIT_CONTENT_ITEM');
  String get CREATE_CONTENT_ITEM => getTranslation('CREATE_CONTENT_ITEM');
  String get EDIT_NATIVE_LANGUAGE => getTranslation('EDIT_NATIVE_LANGUAGE');
  String get CREATE_NATIVE_LANGUAGE => getTranslation('CREATE_NATIVE_LANGUAGE');
  String get EDIT_STATE => getTranslation('EDIT_STATE');
  String get CREATE_STATE => getTranslation('CREATE_STATE');
  String get BROWSE_IMAGE => getTranslation('BROWSE_IMAGE');
  String get DROP_IMAGE_HERE => getTranslation('DROP_IMAGE_HERE');
  String get REMOVE_IMAGE => getTranslation('REMOVE_IMAGE');
  String get NOT_IMAGE_WARNING_MESSAGE => getTranslation('NOT_IMAGE_WARNING_MESSAGE');
  String get NOTIFICATIONS => getTranslation('NOTIFICATIONS');
  String get NO_NOTIFICATIONS_YET => getTranslation('NO_NOTIFICATIONS_YET');
  String get FOLDER_TREE => getTranslation('FOLDER_TREE');
  String get DESK => getTranslation('DESK');

  factory CommonTranslation.defaultEnglish() => CommonTranslation(
    translationStringList: {
      "EXPAND": "Expand",
      "COLLAPSE": "Collapse",
      "COPY": "Copy",
      "COPY_TO_CLIPBOARD": "Copy to clipboard",
      "TODO": "To-Do",
      "CLOUD": "Cloud",
      "AI_CHAT": "AI Chat",
      "DOCU": "Documentation",
      "CONTACT": "Contact",
      "VU_MEET": "VuMeet",
      "NEWS": "News",
      "PEOPLE": "People",
      "GROUPS": "Groups",
      "CONTACTS": "Contacts",
      "FEATURE_FLAGS": "Feature Flags",
      "PERMISSIONS": "Permissions",
      "USER_GROUP_PERMISSION": "User group permission",
      "ROLE_PERMISSION": "Role permission",
      "TOOLS": "Tools",
      "TALKIE": "Talkie",
      "BULLETIN": "Bulletin",
      "HELP": "Help",
      "SETTINGS": "Settings",
      "LOGOUT": "Logout",
      "WELCOME_TO": "Welcome to",
      "SEARCH": "Search",
      "MY_ACCOUNT": "My Account",
      "LOGGED_OUT_MESSAGE": "You have been logged out",
      "LOGIN_AGAIN": "Login again",
      "SELECT_LANGUAGE": "Select language",
      "ADMINISTRATION": "Administration",
      "USERS": "Users",
      "TENANTS": "Organizations",
      "COUNTRY": "Countries",
      "ROLE": "Roles",
      "LANGUAGES": "Languages",
      "NATIVE_LANGUAGES": "Native Languages",
      "REGIONS": "Regions",
      "STATE": "States",
      "TAGS": "Tags",
      "MINISTRIES": "Ministries",
      "USER_GROUPS": "User Groups",
      "USER_GROUP": "User group",
      "CONTRACT_TYPES": "Contract Types",
      "CONTENT_ITEM": "Content Item",
      "CREATE": "Create",
      "UPDATE": "Update",
      "ACTIONS": "Actions",
      "EDIT": "Edit",
      "DELETE": "Delete",
      "ENTER_VALID_EMAIL": "Please enter a valid email address",
      "ENTER_VALID_POSTAL_CODE": "Please enter a valid postal code",
      "ENTER_VALID_COORDINATES": "Please enter a valid coordinates",
      "YES": "Yes",
      "NO": "No",
      "CONFIRM_DELETION": "Confirm deletion",
      "DELETE_ITEM_MESSAGE": "Do you want to delete this item ?",
      "ITEM_DELETED_MESSAGE": "Item deleted successfully",
      "USER_GROUP_HAS_CHILDREN_MESSAGE":
          "This user group cannot be deleted because it contains nested groups.",
      "PUBLISHED": "Published",
      "UNPUBLISHED": "Unpublished",
      "DRAFT": "Draft",
      "NAME": "Name",
      "FIRST_NAME": "First Name",
      "LAST_NAME": "Last Name",
      "EMAIL": "Email",
      "FROM": "From",
      "TO": "To",
      "CREATE_BASE": "Create Base",
      "EDIT_BASE": "Edit Base",
      "CREATE_BRANCH": "Create Branch",
      "EDIT_BRANCH": "Edit Branch",
      "SUBMIT": "Submit",
      "ADMIN": "Admin",
      "USER": "User",
      "CANCEL": "Cancel",
      "SELECT_DATE": "Select Date",
      "SELECT_TIME": "Select Time",
      "DUE_DATE": "Due Date",
      "HORIZONTAL": "Horizontal",
      "VERTICAL": "Vertical",
      "SAVE": "Save",
      "EDIT_TODO": "Edit to-do",
      "ADD_TODO": "Create to-do",
      "AI_ASSISTANCE": "AI Assistance",
      "EDIT_COUNTRY": "Edit Country",
      "ADD_COUNTRY": "Add Country",
      "ABOUT": "About",
      "VERSION": "Version",
      "PUBLISHED_APP": "Published",
      "COPYRIGHT": "Copyright",
      "LICENSE": "License",
      "SUPPORT": "Support",
      "IMPRESSUM": "Imprint",
      "POLICY": "Privacy Policy",
      "EDIT_TAG": "Edit Tag",
      "CREATE_TAG": "Create Tag",
      "ADD_REGION": "Add Region",
      "EDIT_REGION": "Edit Region",
      "ADD_USER": "Add User",
      "EDIT_USER": "Edit User",
      "ADD_ROLE": "Add Role",
      "EDIT_ROLE": "Edit Role",
      "EDIT_PROFILE": "Edit profile",
      "EDIT_PASSWORD": "Edit password",
      "PASSWORD_REQUIREMENT_MIN_LENGTH": "At least {count} characters",
      "PASSWORD_REQUIREMENT_MAX_LENGTH": "At most {count} characters",
      "PASSWORD_REQUIREMENT_MIN_LOWERCASE": "At least {count} lowercase letter(s)",
      "PASSWORD_REQUIREMENT_MIN_UPPERCASE": "At least {count} uppercase letter(s)",
      "PASSWORD_REQUIREMENT_MIN_DIGITS": "At least {count} digit(s)",
      "PASSWORD_REQUIREMENT_MIN_SPECIAL": "At least {count} special character(s)",
      "PASSWORD_REQUIREMENT_NO_SPACES": "No spaces",
      "PASSWORD_REQUIREMENT_NO_USERNAME": "Must not contain your username",
      "PASSWORD_REQUIREMENT_NO_EMAIL_OR_NAME": "Must not contain your email or name",
      "PASSWORD_REQUIREMENT_NOT_COMMON": "Must not be a commonly used password",
      "PASSWORD_REQUIREMENT_MAX_REPEATED": "No more than {count} repeated characters in a row",
      "PASSWORD_RECENTLY_USED": "This password was used recently, choose a different one",
      "PASSWORD_DO_NOT_MATCH": "Passwords do not match",
      "LOGS": "Logs",
      "VIEW_LOG_DATA": "View Log Data",
      "COLOR_RED": "Red",
      "COLOR_GREEN": "Green",
      "COLOR_BLUE": "Blue",
      "COLOR_YELLOW": "Yellow",
      "COLOR_BLACK": "Black",
      "COLOR_WHITE": "White",
      "COLOR_PINK": "Pink",
      "COLOR_PURPLE": "Purple",
      "COLOR_DEEP_PURPLE": "Deep Purple",
      "COLOR_INDIGO": "Indigo",
      "COLOR_LIGHT_BLUE": "Light Blue",
      "COLOR_CYAN": "Cyan",
      "COLOR_TEAN": "Teal",
      "COLOR_LIGHT_GREEN": "Light Green",
      "COLOR_LIME": "Lime",
      "COLOR_AMBER": "Amber",
      "COLOR_ORANGE": "Orange",
      "COLOR_DEEP_ORANGE": "Deep Orange",
      "COLOR_BROWN": "Brown",
      "COLOR_GREY": "Grey",
      "ACCESS_DENIED": "Access Denied",
      "INSUFFICIENT_PERMISSIONS": "You do not have sufficient permissions to view this page.",
      "CONTACT_ADMINISTRATOR": "Please contact an administrator if you believe this is an error.",
      "ADMINISTRATION_DASHBOARD": "Administration Dashboard",
      "ADMINISTRATION_DASHBOARD_SUBTITLE": "Manage core settings and data for the application.",
      "EDUCATIONAL_CONTENTS": "Core Data Management",
      "SYSTEM_AND_ACCESS_CATEGORY": "System & Access",
      "PAGE_NOT_FOUND": "Page not found",
      "RETURN_TO_HOME": "Return to home",
      "CHANGE_LOG": "Change Log",
      "VERSION_HISTORY": "Version History",
      "MOTTO": "Empowering digital education for the future.",
      "NO_VERSION_HISTORY": "No version history found.",
      "COULD_NOT_LOAD_CHANGELOG": "Could not load changelog.",
      "DOWNLOADS": "Downloads",
      "DOWNLOAD": "Download",
      "COULD_NOT_LOAD_URL": "Could not launch URL",
      "CONTACT_MANAGER_TITLE": "Contact Manager",
      "SYSTEM": "System",
      "ADD": "Add",
      "SORT_BY": "Sort",
      "FILTER_BY": "Filter",
      "NO_RESULTS_FOUND": "No results found",
      "NO_DATA_FOUND": "No data found",
      "NO_DESCRIPTION_AVAILABLE": "No description available yet.",
      "UNSAVED_CHANGES": "Unsaved Changes",
      "UNSAVED_ROLE_CHANGES_MESSAGE":
          "You have unsaved changes. Are you sure you want to switch roles? Your changes will be lost.",
      "UNSAVED_PERMISSION_CHANGES_MESSAGE":
          "You have unsaved permission changes. Are you sure you want to continue? Your changes will be lost.",
      "MISSING_PERMISSION_DEPENDENCIES_TITLE": "Related permissions need attention",
      "MISSING_PERMISSION_DEPENDENCIES_MESSAGE":
          "Some of the permissions you just changed are inconsistent with others: a permission you enabled still needs something that's off, or a permission you disabled is still required by something that's on.",
      "PERMISSION_DEPENDENCY_NEEDS_ENABLING_HINT":
          "Required by a permission you just enabled — turn this on too, or that feature won't work.",
      "PERMISSION_DEPENDENCY_NEEDS_DISABLING_HINT":
          "Still on, but it needed a permission you just disabled — consider turning this off too.",
      "PERMISSION_DEPENDENCY_REENABLE_SUGGESTION_HINT":
          "Not required, but still off — you may have turned it off along with the permission you just re-enabled. Consider turning it back on too.",
      "PERMISSION_ASSISTANT": "Permission Assistant",
      "PERMISSION_ASSISTANT_TOOLTIP":
          "Permission Assistant: flags permissions that should probably be turned on or off, even ones nobody touched this session.",
      "PERMISSION_DEPENDS_ON_LABEL": "Depends on",
      "PERMISSION_STILL_REQUIRED_BY_LABEL": "Still required by",
      "PERMISSION_REENABLE_SUGGESTION_LABEL": "You may also want to re-enable",
      "NO_PERMISSION_DEPENDENCIES": "This permission doesn't depend on anything else.",
      "PERMISSION_DEPENDENCIES_TOOLTIP": "Dependencies",
      "APPLY_PERMISSION_TOOLTIP": "Apply to other roles/groups",
      "APPLY_PERMISSION_TO_TITLE": "Apply permission to",
      "APPLY_PERMISSION_SUCCESS_MESSAGE": "Permission applied successfully",
      "APPLY_PERMISSION_FAILURE_MESSAGE": "Failed to apply the permission to some targets",
      "APPLY": "Apply",
      "SAVE_ANYWAY": "Save anyway",
      "PERMISSION": "Permission",
      "SCOPE": "Scope",
      "EFFECT": "Effect",
      "ALL": "All",
      "OWN": "Own",
      "TENANT": "Organization",
      "REGION": "Region",
      "CUSTOM": "Custom",
      "ALLOW": "Allow",
      "DENY": "Deny",
      "INHERIT": "Inherit",
      "CALENDAR": "Calendar",
      "ACCESSIBILITY_YES_ENABLED": "Yes, enabled, or true",
      "ACCESSIBILITY_NO_DISABLED": "No, disabled, or false",
      "ACCESSIBILITY_CURRENT_VERSION": "Current version",
      "ACCESSIBILITY_NORMAL_PRIORITY": "Normal priority",
      "ACCESSIBILITY_HIGH_PRIORITY": "High priority",
      "ACCESSIBILITY_URGENT_PRIORITY": "Urgent priority",
      "ACCESSIBILITY_TO_DO": "To do, not started",
      "ACCESSIBILITY_WORK_STARTED": "Work started",
      "ACCESSIBILITY_HALFWAY": "Half way completed",
      "ACCESSIBILITY_ALMOST_DONE": "Almost completed",
      "ACCESSIBILITY_FINISHED": "Finished, completed",
      "ACCESSIBILITY_MORE_INFO": "More information available",
      "ACCESSIBILITY_SORTED_ASC": "Sorted ascending",
      "ACCESSIBILITY_SORTED_DESC": "Sorted descending",
      "ACCESSIBILITY_SORT_OPTIONS": "Sort ascending or descending",
      "ACCESSIBILITY_ERROR": "Error",
      "ACCESSIBILITY_SHARE_FILES": "Share files",
      "ACCESSIBILITY_CLOSE_DIALOG": "Close dialog",
      "ACCESSIBILITY_SHARE": "Share",
      "ACCESSIBILITY_DOWNLOAD": "Download",
      "ACCESSIBILITY_GROUP_AVATAR": "Group avatar",
      "ACCESSIBILITY_UPLOAD_FILES": "Upload files to cloud",
      "ACCESSIBILITY_EDIT": "Edit",
      "ACCESSIBILITY_DELETE": "Delete",
      "ACCESSIBILITY_HANG_UP": "Hang up",
      "ACCESSIBILITY_VIDEO_CALL": "Video call",
      "ACCESSIBILITY_AVATAR_UPLOAD": "User avatar, click to upload image",
      "ACCESSIBILITY_ADD_PHOTO": "Add photo",
      "ACCESSIBILITY_EDIT_PHOTO": "Edit photo",
      "ACCESSIBILITY_DELETE_AVATAR": "Delete avatar",
      "APP_INSTALLATION_MESSAGE": "Install Copor app for best user experience.",
      "APP_DOWNLOAD": "App Download",
      "VIDEO_CALL_MOBILE_ONLY":
          "Video calls are only available on the mobile app. Please use the Copor app on your phone to start a call.",
      "NO_INTERNET_CONNECTION": "No internet connection.",
      "SERVER_UNAVAILABLE_MESSAGE": "The server is temporarily unavailable. Please try again.",
      "NO_INTERNET_MESSAGE": "Please check your internet connection and try again.",
      "ACTIVATION": "Activation",
      "CALLING": "Calling...",
      "INCOMING_CALL_STATUS": "Incoming call...",
      "DIDNT_ANSWER": "didn't answer",
      "ANSWER": "Answer",
      "DECLINE": "Decline",
      "CALL_AGAIN": "Call again",
      "RETURN_TO_CALL": "Return to call",
      "CALL_ENDED_LABEL": "Call ended",
      "CALL_DECLINED": "Call declined",
      "LEFT_CALL": "left the call",
      "GROUP_CALL_MISSING_MEMBERS": "missing",
      "TENANT_ACTIVATED_SUCCESSFULLY":
          "A message with the next steps has been sent to your organization's email address.",
      "SAVE_SMTP": "Save Test",
      "APPLIED_FILTERS": "Applied filters",
      "INACTIVE_USER": "Inactive user",
      "UPLOADING_FILES": "Uploading files",
      "BROWSE_IMAGE": "Browse image",
      "DROP_IMAGE_HERE": "Drop image here to upload",
      "REMOVE_IMAGE": "Remove image",
      "NOT_IMAGE_WARNING_MESSAGE": "Selected file is not a supported image format",
      "NOTIFICATIONS": "Notifications",
      "NO_NOTIFICATIONS_YET": "No notification yet",
      "FOLDER_TREE": "Folder tree",
      "DESK": "Desk",
    },
  );

  factory CommonTranslation.defaultGerman() => CommonTranslation(
    translationStringList: {
      "EXPAND": "Erweitern",
      "COLLAPSE": "Reduzieren",
      "COPY": "Kopieren",
      "COPY_TO_CLIPBOARD": "In die Zwischenablage kopieren",
      "TODO": "To-Do",
      "CLOUD": "Cloud",
      "AI_CHAT": "KI-Chat",
      "DOCU": "Dokumentation",
      "CONTACT": "Kontakt",
      "VU_MEET": "VuMeet",
      "NEWS": "Neuigkeiten",
      "PEOPLE": "Personen",
      "GROUPS": "Gruppen",
      "CONTACTS": "Kontakte",
      "FEATURE_FLAGS": "Feature-Schalter",
      "PERMISSIONS": "Berechtigungen",
      "USER_GROUP_PERMISSION": "Benutzergruppenberechtigung",
      "ROLE_PERMISSION": "Rollenberechtigung",
      "TOOLS": "Werkzeuge",
      "TALKIE": "Talkie",
      "BULLETIN": "Mitteilung",
      "HELP": "Hilfe",
      "SETTINGS": "Einstellungen",
      "LOGOUT": "Abmelden",
      "WELCOME_TO": "Willkommen bei",
      "SEARCH": "Suchen",
      "MY_ACCOUNT": "Mein Konto",
      "LOGGED_OUT_MESSAGE": "Sie wurden abgemeldet",
      "LOGIN_AGAIN": "Erneut anmelden",
      "SELECT_LANGUAGE": "Sprache auswählen",
      "ADMINISTRATION": "Verwaltung",
      "USERS": "Benutzer",
      "TENANTS": "Organisationen",
      "COUNTRY": "Länder",
      "ROLE": "Rollen",
      "LANGUAGES": "Sprachen",
      "NATIVE_LANGUAGES": "Muttersprachen",
      "REGIONS": "Regionen",
      "STATE": "Bundesländer",
      "TAGS": "Tags",
      "MINISTRIES": "Ministerien",
      "USER_GROUPS": "Benutzergruppen",
      "USER_GROUP": "Benutzergruppe",
      "CONTRACT_TYPES": "Vertragsarten",
      "CONTENT_ITEM": "Inhaltseintrag",
      "CREATE": "Erstellen",
      "UPDATE": "Aktualisieren",
      "ACTIONS": "Aktionen",
      "EDIT": "Bearbeiten",
      "DELETE": "Löschen",
      "ENTER_VALID_EMAIL": "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      "ENTER_VALID_POSTAL_CODE": "Bitte geben Sie eine gültige Postleitzahl ein.",
      "ENTER_VALID_COORDINATES": "Bitte geben Sie eine gültige Koordinaten ein.",
      "YES": "Ja",
      "NO": "Nein",
      "CONFIRM_DELETION": "Löschung bestätigen",
      "DELETE_ITEM_MESSAGE": "Möchten Sie dieses Element löschen?",
      "ITEM_DELETED_MESSAGE": "Element erfolgreich gelöscht.",
      "USER_GROUP_HAS_CHILDREN_MESSAGE":
          "Diese Benutzergruppe kann nicht gelöscht werden, da sie untergeordnete Gruppen enthält.",
      "PUBLISHED": "Veröffentlicht",
      "UNPUBLISHED": "Unveröffentlicht",
      "DRAFT": "Entwurf",
      "NAME": "Name",
      "FIRST_NAME": "Vorname",
      "LAST_NAME": "Nachname",
      "EMAIL": "E-Mail",
      "FROM": "Von",
      "TO": "Bis",
      "CREATE_BASE": "Base erstellen",
      "EDIT_BASE": "Base bearbeiten",
      "CREATE_BRANCH": "Branch erstellen",
      "EDIT_BRANCH": "Branch bearbeiten",
      "SUBMIT": "Absenden",
      "ADMIN": "Admin",
      "USER": "Benutzer",
      "DUE_DATE": "Fälligkeitsdatum",
      "CANCEL": "Abbrechen",
      "SELECT_DATE": "Datum auswählen",
      "SELECT_TIME": "Zeit auswählen",
      "HORIZONTAL": "Horizontal",
      "VERTICAL": "Vertikal",
      "SAVE": "Speichern",
      "ADD_TODO": "To-do erstellen",
      "EDIT_TODO": "To-do bearbeiten",
      "EDIT_COUNTRY": "Land bearbeiten",
      "ADD_COUNTRY": "Land hinzufügen",
      "AI_ASSISTANCE": "KI-Assistenz",
      "ABOUT": "Über",
      "VERSION": "Version",
      "PUBLISHED_APP": "Veröffentlicht",
      "COPYRIGHT": "Copyright",
      "LICENSE": "Lizenz",
      "IMPRESSUM": "Impressum",
      "SUPPORT": "Support",
      "POLICY": "Datenschutz",
      "EDIT_TAG": "Tag Bearbeiten",
      "CREATE_TAG": "Tag Erstellen",
      "ADD_REGION": "Region hinzufügen",
      "EDIT_REGION": "Region bearbeiten",
      "ADD_USER": "Benutzer hinzufügen",
      "EDIT_USER": "Benutzer bearbeiten",
      "ADD_ROLE": "Rolle hinzufügen",
      "EDIT_ROLE": "Rolle bearbeiten",
      "LOGS": "Protokolle",
      "VIEW_LOG_DATA": "Protokolldaten",
      "EDIT_PROFILE": "Profile bearbeiten",
      "EDIT_PASSWORD": "Passwort bearbeiten",
      "COLOR_RED": "Rot",
      "COLOR_GREEN": "Grün",
      "COLOR_BLUE": "Blau",
      "COLOR_YELLOW": "Gelb",
      "COLOR_BLACK": "Schwarz",
      "COLOR_WHITE": "Weiß",
      "COLOR_PINK": "Rosa",
      "COLOR_PURPLE": "Lila",
      "COLOR_DEEP_PURPLE": "Dunkellila",
      "COLOR_INDIGO": "Indigo",
      "COLOR_LIGHT_BLUE": "Hellblau",
      "COLOR_CYAN": "Cyan",
      "COLOR_TEAN": "Türkis",
      "COLOR_LIGHT_GREEN": "Hellgrün",
      "COLOR_LIME": "Limette",
      "COLOR_AMBER": "Bernstein",
      "COLOR_ORANGE": "Orange",
      "COLOR_DEEP_ORANGE": "Dunkelorange",
      "COLOR_BROWN": "Braun",
      "COLOR_GREY": "Grau",
      "ACCESS_DENIED": "Zugriff verweigert",
      "INSUFFICIENT_PERMISSIONS":
          "Sie haben keine ausreichenden Berechtigungen, um diese Seite anzuzeigen.",
      "CONTACT_ADMINISTRATOR":
          "Bitte kontaktieren Sie einen Administrator, wenn Sie glauben, dass dies ein Fehler ist.",
      "ADMINISTRATION_DASHBOARD": "Verwaltungs-Dashboard",
      "ADMINISTRATION_DASHBOARD_SUBTITLE":
          "Verwalten Sie die Kerneinstellungen und Daten für die Anwendung.",
      "EDUCATIONAL_CONTENTS": "Kerndatenverwaltung",
      "SYSTEM_AND_ACCESS_CATEGORY": "System & Zugriff",
      "PAGE_NOT_FOUND": "Seite nicht gefunden",
      "RETURN_TO_HOME": "Zurück zur Startseite",
      "CHANGE_LOG": "Änderungsprotokoll",
      "VERSION_HISTORY": "Versionsgeschichte",
      "MOTTO": "Digitale Bildung für die Zukunft gestalten.",
      "NO_VERSION_HISTORY": "Keine Versionsgeschichte gefunden.",
      "COULD_NOT_LOAD_CHANGELOG": "Changelog konnte nicht geladen werden.",
      "DOWNLOADS": "Downloads",
      "DOWNLOAD": "Herunterladen",
      "COULD_NOT_LOAD_URL": "URL konnte nicht geöffnet werden",
      "CONTACT_MANAGER_TITLE": "Kontaktmanager",
      "SYSTEM": "System",
      "ADD": "Hinzufügen",
      "SORT_BY": "Sortieren",
      "FILTER_BY": "Filtern",
      "NO_RESULTS_FOUND": "Keine Ergebnisse gefunden",
      "NO_DATA_FOUND": "Keine Ergebnisse gefunden",
      "NO_DESCRIPTION_AVAILABLE": "Noch keine Beschreibung verfügbar.",
      "UNSAVED_CHANGES": "Ungespeicherte Änderungen",
      "UNSAVED_ROLE_CHANGES_MESSAGE":
          "Sie haben ungespeicherte Änderungen. Sind Sie sicher, dass Sie die Rolle wechseln möchten? Ihre Änderungen gehen verloren.",
      "UNSAVED_PERMISSION_CHANGES_MESSAGE":
          "Sie haben ungespeicherte Berechtigungsänderungen. Möchten Sie wirklich fortfahren? Ihre Änderungen gehen verloren.",
      "MISSING_PERMISSION_DEPENDENCIES_TITLE": "Zusammenhängende Berechtigungen prüfen",
      "MISSING_PERMISSION_DEPENDENCIES_MESSAGE":
          "Einige der soeben geänderten Berechtigungen stimmen nicht mit anderen überein: Eine aktivierte Berechtigung benötigt noch etwas Deaktiviertes, oder eine deaktivierte Berechtigung wird noch von etwas Aktiviertem benötigt.",
      "PERMISSION_DEPENDENCY_NEEDS_ENABLING_HINT":
          "Wird von einer soeben aktivierten Berechtigung benötigt — aktivieren Sie diese ebenfalls, sonst funktioniert die Funktion nicht.",
      "PERMISSION_DEPENDENCY_NEEDS_DISABLING_HINT":
          "Noch aktiviert, benötigte aber eine soeben deaktivierte Berechtigung — deaktivieren Sie diese ebenfalls.",
      "PERMISSION_ASSISTANT": "Berechtigungsassistent",
      "PERMISSION_ASSISTANT_TOOLTIP":
          "Berechtigungsassistent: markiert Berechtigungen, die vermutlich aktiviert oder deaktiviert werden sollten — auch solche, die in dieser Sitzung nicht angefasst wurden.",
      "PERMISSION_DEPENDENCY_REENABLE_SUGGESTION_HINT":
          "Nicht erforderlich, aber noch deaktiviert — möglicherweise wurde dies zusammen mit der soeben reaktivierten Berechtigung deaktiviert. Erwägen Sie, dies ebenfalls zu aktivieren.",
      "PERMISSION_DEPENDS_ON_LABEL": "Abhängig von",
      "PERMISSION_STILL_REQUIRED_BY_LABEL": "Wird noch benötigt von",
      "PERMISSION_REENABLE_SUGGESTION_LABEL": "Sie sollten eventuell auch reaktivieren",
      "NO_PERMISSION_DEPENDENCIES": "Diese Berechtigung hängt von keiner anderen ab.",
      "PERMISSION_DEPENDENCIES_TOOLTIP": "Abhängigkeiten",
      "APPLY_PERMISSION_TOOLTIP": "Auf andere Rollen/Gruppen anwenden",
      "APPLY_PERMISSION_TO_TITLE": "Berechtigung anwenden auf",
      "APPLY_PERMISSION_SUCCESS_MESSAGE": "Berechtigung erfolgreich angewendet",
      "APPLY_PERMISSION_FAILURE_MESSAGE":
          "Die Berechtigung konnte nicht auf alle Ziele angewendet werden",
      "APPLY": "Anwenden",
      "SAVE_ANYWAY": "Trotzdem speichern",
      "PERMISSION": "Berechtigung",
      "SCOPE": "Scope",
      "EFFECT": "Effekt",
      "ALL": "Alle",
      "OWN": "Eigene",
      "TENANT": "Organisation",
      "REGION": "Region",
      "CUSTOM": "Benutzerdefiniert",
      "ALLOW": "Erlauben",
      "DENY": "Verweigern",
      "INHERIT": "Vererben",
      "CALENDAR": "Kalender",
      "ACCESSIBILITY_YES_ENABLED": "Ja, aktiviert oder wahr",
      "ACCESSIBILITY_NO_DISABLED": "Nein, deaktiviert oder falsch",
      "ACCESSIBILITY_CURRENT_VERSION": "Aktuelle Version",
      "ACCESSIBILITY_NORMAL_PRIORITY": "Normale Priorität",
      "ACCESSIBILITY_HIGH_PRIORITY": "Hohe Priorität",
      "ACCESSIBILITY_URGENT_PRIORITY": "Dringende Priorität",
      "ACCESSIBILITY_TO_DO": "Zu erledigen, nicht gestartet",
      "ACCESSIBILITY_WORK_STARTED": "Arbeit gestartet",
      "ACCESSIBILITY_HALFWAY": "Halb abgeschlossen",
      "ACCESSIBILITY_ALMOST_DONE": "Fast abgeschlossen",
      "ACCESSIBILITY_FINISHED": "Fertig, abgeschlossen",
      "ACCESSIBILITY_MORE_INFO": "Weitere Informationen verfügbar",
      "ACCESSIBILITY_SORTED_ASC": "Aufsteigend sortiert",
      "ACCESSIBILITY_SORTED_DESC": "Absteigend sortiert",
      "ACCESSIBILITY_SORT_OPTIONS": "Aufsteigend oder absteigend sortieren",
      "ACCESSIBILITY_ERROR": "Fehler",
      "ACCESSIBILITY_SHARE_FILES": "Dateien freigeben",
      "ACCESSIBILITY_CLOSE_DIALOG": "Dialog schließen",
      "ACCESSIBILITY_SHARE": "Freigeben",
      "ACCESSIBILITY_DOWNLOAD": "Herunterladen",
      "ACCESSIBILITY_GROUP_AVATAR": "Gruppen-Avatar",
      "ACCESSIBILITY_UPLOAD_FILES": "Dateien in die Cloud hochladen",
      "ACCESSIBILITY_EDIT": "Bearbeiten",
      "ACCESSIBILITY_DELETE": "Löschen",
      "ACCESSIBILITY_HANG_UP": "Auflegen",
      "ACCESSIBILITY_VIDEO_CALL": "Videoanruf",
      "ACCESSIBILITY_AVATAR_UPLOAD": "Benutzer-Avatar, klicken zum Hochladen von Bildern",
      "ACCESSIBILITY_ADD_PHOTO": "Foto hinzufügen",
      "ACCESSIBILITY_EDIT_PHOTO": "Foto bearbeiten",
      "ACCESSIBILITY_DELETE_AVATAR": "Avatar löschen",
      "APP_INSTALLATION_MESSAGE":
          "Installieren Sie die Copor-App für die beste Benutzererfahrung.",
      "APP_DOWNLOAD": "App Herunterladen",
      "VIDEO_CALL_MOBILE_ONLY":
          "Videoanrufe sind nur in der mobilen App verfügbar. Bitte verwenden Sie die Copor-App auf Ihrem Handy, um einen Anruf zu starten.",
      "NO_INTERNET_CONNECTION": "Keine Internetverbindung.",
      "SERVER_UNAVAILABLE_MESSAGE":
          "Der Server ist vorübergehend nicht erreichbar. Bitte versuchen Sie es erneut.",
      "NO_INTERNET_MESSAGE":
          "Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      "ACTIVATION": "Aktivierung",
      "CALLING": "Anruf läuft...",
      "INCOMING_CALL_STATUS": "Eingehender Anruf...",
      "DIDNT_ANSWER": "hat nicht geantwortet",
      "ANSWER": "Annehmen",
      "DECLINE": "Ablehnen",
      "CALL_AGAIN": "Erneut anrufen",
      "RETURN_TO_CALL": "Zurück zum Anruf",
      "CALL_ENDED_LABEL": "Anruf beendet",
      "CALL_DECLINED": "Anruf abgelehnt",
      "LEFT_CALL": "hat den Anruf verlassen",
      "GROUP_CALL_MISSING_MEMBERS": "fehlen",
      "TENANT_ACTIVATED_SUCCESSFULLY":
          "Eine Nachricht mit den nächsten Schritten wurde an die E-Mail-Adresse Ihrer Organisation gesendet.",
      "SAVE_SMTP": "Save Test",
      "APPLIED_FILTERS": "Aktive Filter",
      "INACTIVE_USER": "Inaktiver Benutzer",
      "UPLOADING_FILES": "Dateien werden hochgeladen",
      "BROWSE_IMAGE": "Bild durchsuchen",
      "DROP_IMAGE_HERE": "Bild hierher ziehen zum Hochladen",
      "REMOVE_IMAGE": "Bild entfernen",
      "NOT_IMAGE_WARNING_MESSAGE": "Die ausgewählte Datei ist kein unterstütztes Bildformat",
      "NOTIFICATIONS": "Benachrichtigungen",
      "NO_NOTIFICATIONS_YET": "Noch keine Benachrichtigungen",
      "FOLDER_TREE": "Ordnerstruktur",
      "DESK": "Schreibtisch",
    },
  );

  @override
  String get namespace => namespaceStatic;
}
