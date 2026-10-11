// ignore_for_file: constant_identifier_names, non_constant_identifier_names

import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'package:copor_vu_meet/src/config/vu_meet_namespaces.dart';

class VuMeetPageTranslation extends TranslationModel implements MediaPickerTranslations {
  static const String namespaceStatic = VuMeetModelNamespaces.VuMeet;

  const VuMeetPageTranslation({required super.translationStringList});

  factory VuMeetPageTranslation.fromModel(TranslationModel model) {
    return VuMeetPageTranslation(translationStringList: model.translationStringList);
  }
  String get CALL_ACCEPTED => getTranslation('CALL_ACCEPTED');
  String get START_CALL => getTranslation('START_CALL');
  String get END_CALL => getTranslation('END_CALL');
  String get DECLINE_CALL => getTranslation('DECLINE_CALL');
  String get TIMEOUT_CALL => getTranslation('TIMEOUT_CALL');
  String get CALL_ENDED_NOTIFICATION => getTranslation('CALL_ENDED_NOTIFICATION');
  String get MISSED_CALL_NOTIFICATION => getTranslation('MISSED_CALL_NOTIFICATION');
  String get DID_NOT_ANSWER_NOTIFICATION => getTranslation('DID_NOT_ANSWER_NOTIFICATION');
  String get CALL_DECLINED_NOTIFICATION => getTranslation('CALL_DECLINED_NOTIFICATION');
  String get VU_MEET => getTranslation('VU_MEET');
  String get SEARCH_VU_MEET => getTranslation('SEARCH_VU_MEET');
  String get SEARCH => getTranslation('SEARCH');
  String get MESSAGE => getTranslation('MESSAGE');
  String get MESSAGES => getTranslation('MESSAGES');
  String get NEW_CHAT => getTranslation('NEW_CHAT');
  String get CREATE_CHAT => getTranslation('CREATE_CHAT');
  String get GROUP_NAME => getTranslation('GROUP_NAME');
  String get CHAT_SCREEN => getTranslation('CHAT_SCREEN');
  String get NEW_GROUP => getTranslation('NEW_GROUP');
  String get CREATE_NEW_GROUP => getTranslation('CREATE_NEW_GROUP');
  String get EDIT_GROUP => getTranslation('EDIT_GROUP');
  String get CREATE_GROUP => getTranslation('CREATE_GROUP');
  String get USERS => getTranslation('USERS');
  String get SELECT_USER => getTranslation('SELECT_USER');
  String get LIST_OF_USERS => getTranslation('LIST_OF_USERS');
  String get ADD_MEMBERS => getTranslation('ADD_MEMBERS');
  String get SEEN => getTranslation('SEEN');
  String get NOT_SEEN => getTranslation('NOT_SEEN');
  String get SEEN_BY => getTranslation('SEEN_BY');
  String get UNKNOWN => getTranslation('UNKNOWN');
  String get TYPING => getTranslation('TYPING');
  String get YESTERDAY => getTranslation('YESTERDAY');
  String get PLEASE_ENTER_GROUP_NAME => getTranslation('PLEASE_ENTER_GROUP_NAME');
  String get YOU_NEED_TO_SELECT_AT_LEAST_ONE_USER =>
      getTranslation('YOU_NEED_TO_SELECT_AT_LEAST_ONE_USER');
  String get SELECT_A_CHAT_TO_SEE_MESSAGES => getTranslation('SELECT_A_CHAT_TO_SEE_MESSAGES');
  String get NO_MESSAGES_YET => getTranslation('NO_MESSAGES_YET');
  String get START_CONVERSATION => getTranslation('START_CONVERSATION');
  String get FAILED_TO_LOAD_USER_CHAT_LIST => getTranslation('FAILED_TO_LOAD_USER_CHAT_LIST');
  String get START_A_CONVERSATION_AND_CONNECT_WITH_OTHERS =>
      getTranslation('START_A_CONVERSATION_AND_CONNECT_WITH_OTHERS');
  String get NO_CHATS_AVAILABLE => getTranslation('NO_CHATS_AVAILABLE');
  String get CREATE_YOUR_FIRST_CHAT => getTranslation('CREATE_YOUR_FIRST_CHAT');
  String get FAILED_TO_UPDATE_TYPING_STATUS => getTranslation('FAILED_TO_UPDATE_TYPING_STATUS');
  String get FAILED_TO_SEND_MESSAGE_ABOVE => getTranslation('FAILED_TO_SEND_MESSAGE_ABOVE');
  String get FAILED_TO_SEND_MESSAGE => getTranslation('FAILED_TO_SEND_MESSAGE');
  String get FAILED_TO_MARK_MESSAGES_AS_SEEN => getTranslation('FAILED_TO_MARK_MESSAGES_AS_SEEN');
  String get FAILED_TO_LOAD_CHAT_MESSAGES => getTranslation('FAILED_TO_LOAD_CHAT_MESSAGES');
  String get FAILED_TO_CREATE_MESSAGE => getTranslation('FAILED_TO_CREATE_MESSAGE');
  @override
  String get CAMERA_PERMISSION_REQUIRED_TITLE => getTranslation('CAMERA_PERMISSION_REQUIRED_TITLE');
  String get CAMERA_PERMISSION_REQUIRED_SUBTITLE =>
      getTranslation('CAMERA_PERMISSION_REQUIRED_SUBTITLE');
  @override
  String get OPEN_SETTINGS => getTranslation('OPEN_SETTINGS');
  @override
  String get CANCEL => getTranslation('CANCEL');
  String get CAMERA_CAPTURE_CANCELLED => getTranslation('CAMERA_CAPTURE_CANCELLED');
  @override
  String get CAMERA_PERMISSION_DENIED => getTranslation('CAMERA_PERMISSION_DENIED');
  @override
  String get CAMERA_PERMISSION_PERMANENTLY_DENIED =>
      getTranslation('CAMERA_PERMISSION_PERMANENTLY_DENIED');
  @override
  String get FAILED_TO_READ_FILE => getTranslation('FAILED_TO_READ_FILE');
  @override
  String get CONFIRM_DOWNLOAD => getTranslation('CONFIRM_DOWNLOAD');
  @override
  String get DOWNLOAD_FILE => getTranslation('DOWNLOAD_FILE');
  @override
  String get DO_YOU_WANT_TO_DOWNLOAD => getTranslation('DO_YOU_WANT_TO_DOWNLOAD');
  @override
  String get FILE_DOWNLOADED_SUCCESSFULLY => getTranslation('FILE_DOWNLOADED_SUCCESSFULLY');
  @override
  String get FILE_DOWNLOAD_FAILED => getTranslation('FILE_DOWNLOAD_FAILED');
  @override
  String get STORAGE_PERMISSION_DENIED => getTranslation('STORAGE_PERMISSION_DENIED');
  @override
  String get STORAGE_PERMISSION_PERMANENTLY_DENIED =>
      getTranslation('STORAGE_PERMISSION_PERMANENTLY_DENIED');
  String get SAVE => getTranslation('SAVE');
  String get GROUP_EDIT_TOAST_SUCCESS => getTranslation('GROUP_EDIT_TOAST_SUCCESS');
  String get NO_CONTACT_FOUND => getTranslation('NO_CONTACT_FOUND');
  @override
  String get FILE_TOO_LARGE => getTranslation('FILE_TOO_LARGE');
  String get FILE_TOO_LARGE_MESSAGE => getTranslation('FILE_TOO_LARGE_MESSAGE');
  @override
  String get MAXIMUM_FILE_IS => getTranslation('MAXIMUM_FILE_IS');
  String get REMOVED_FROM_GROUP_NOTIFICATION => getTranslation('REMOVED_FROM_GROUP_NOTIFICATION');
  String get ADDED_TO_GROUP => getTranslation('ADDED_TO_GROUP');
  String get UNNAMED_GROUP_CHAT => getTranslation('UNNAMED_GROUP_CHAT');

  @override
  String get namespace => namespaceStatic;
}
