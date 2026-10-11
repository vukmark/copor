import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_cloud/src/config/cloud_namespaces.dart';

class CloudPageTranslation extends TranslationModel {
  static const String namespaceStatic = CloudNameNamespaces.cloud;

  const CloudPageTranslation({required super.translationStringList});

  factory CloudPageTranslation.fromModel(TranslationModel model) {
    return CloudPageTranslation(translationStringList: model.translationStringList);
  }

  String get MY_CLOUD => getTranslation('MY_CLOUD');

  String get HOME => getTranslation('HOME');

  String get SEARCH => getTranslation('SEARCH');

  String get FLAT_VIEW => getTranslation('FLAT_VIEW');

  String get STRUCTURE_VIEW => getTranslation('STRUCTURE_VIEW');

  String get RECENT => getTranslation('RECENT');

  String get STARRED => getTranslation('STARRED');

  String get TRASH => getTranslation('TRASH');

  String get CLOUD_GROUP => getTranslation('CLOUD_GROUP');

  String get UPLOAD_FILE => getTranslation('UPLOAD_FILE');

  String get FILE_DESCRIPTION => getTranslation('FILE_DESCRIPTION');

  String get BROWSE_FILES => getTranslation('BROWSE_FILES');

  String get AUTO_RENAME => getTranslation('AUTO_RENAME');

  String get OVERRIDE => getTranslation('OVERRIDE');

  String get SEND_NOTIFICATION_TO_RECEIVING_USERS =>
      getTranslation('SEND_NOTIFICATION_TO_RECEIVING_USERS');

  String get FILE_ALREADY_EXISTS => getTranslation('FILE_ALREADY_EXISTS');

  String get FILE_ALREADY_EXISTS_IN_FOLDER => getTranslation('FILE_ALREADY_EXISTS_IN_FOLDER');

  String get CHOOSE_HOW_TO_CONTINUE => getTranslation('CHOOSE_HOW_TO_CONTINUE');

  String get UPLOAD_OPTION => getTranslation('UPLOAD_OPTION');

  String get REPLACE_FILE => getTranslation('REPLACE_FILE');

  String get KEEP_BOTH => getTranslation('KEEP_BOTH');

  String get UPLOAD => getTranslation('UPLOAD');

  String get ADD_FOLDER => getTranslation('ADD_FOLDER');

  String get FOLDER_NAME => getTranslation('FOLDER_NAME');

  String get FOLDER_IS_EMPTY => getTranslation('FOLDER_IS_EMPTY');

  String get SELECT_A_FOLDER_TO_SEE_FILES => getTranslation('SELECT_A_FOLDER_TO_SEE_FILES');

  String get SEND_FILE_TO_USER => getTranslation('SEND_FILE_TO_USER');

  String get SELECT_RECIPIENT => getTranslation('SELECT_RECIPIENT');

  String get NEXT => getTranslation('NEXT');

  String get BACK => getTranslation('BACK');

  String get SEARCH_USERS => getTranslation('SEARCH_USERS');

  String get NO_USERS_FOUND => getTranslation('NO_USERS_FOUND');

  String get SEND_TO => getTranslation('SEND_TO');

  String get CHANGE => getTranslation('CHANGE');

  String get SEND => getTranslation('SEND');

  String get FILE_SENT_SUCCESSFULLY => getTranslation('FILE_SENT_SUCCESSFULLY');

  String get FAILED_TO_SEND_FILE => getTranslation('FAILED_TO_SEND_FILE');

  String get NAME => getTranslation('NAME');

  String get CREATED => getTranslation('CREATED');

  String get SIZE => getTranslation('SIZE');

  String get TYPE => getTranslation('TYPE');

  String get CREATOR => getTranslation('CREATOR');

  String get ACTIONS => getTranslation('ACTIONS');

  String get ERROR_PREFIX => getTranslation('ERROR_PREFIX');

  String get FILE_TOO_LARGE => getTranslation('FILE_TOO_LARGE');

  String get MAXIMUM_FILE_SIZE_IS => getTranslation('MAXIMUM_FILE_SIZE_IS');

  String get OK => getTranslation('OK');

  String get FILES_UPLOADED_SUCCESSFULLY => getTranslation('FILES_UPLOADED_SUCCESSFULLY');

  String get DROP_FILES_HERE_TO_UPLOAD => getTranslation('DROP_FILES_HERE_TO_UPLOAD');

  String get DELETE_FILE_TITLE => getTranslation('DELETE_FILE_TITLE');

  String get DELETE_FILE_MESSAGE => getTranslation('DELETE_FILE_MESSAGE');

  String get CANCEL => getTranslation('CANCEL');

  String get DELETE => getTranslation('DELETE');

  String get FILE_DELETED_SUCCESSFULLY => getTranslation('FILE_DELETED_SUCCESSFULLY');

  String get FAILED_TO_DELETE_FILE => getTranslation('FAILED_TO_DELETE_FILE');

  String get DELETE_GROUP_TITLE => getTranslation('DELETE_GROUP_TITLE');

  String get DELETE_GROUP_MESSAGE => getTranslation('DELETE_GROUP_MESSAGE');

  String get FOLDER_DELETED_SUCCESSFULLY => getTranslation('FOLDER_DELETED_SUCCESSFULLY');

  String get FAILED_TO_DELETE_FOLDER => getTranslation('FAILED_TO_DELETE_FOLDER');

  String get ITEM => getTranslation('ITEM');

  String get ITEMS => getTranslation('ITEMS');

  String get EDIT => getTranslation('EDIT');

  String get PDF_LOAD_ERROR => getTranslation('PDF_LOAD_ERROR');

  String get INVALID_PDF_DATA => getTranslation('INVALID_PDF_DATA');

  String get BYTES_TOO_SHORT => getTranslation('BYTES_TOO_SHORT');

  String get PREVIEW_NOT_AVAILABLE => getTranslation('PREVIEW_NOT_AVAILABLE');

  String get DOWNLOADED_SUCCESSFULLY => getTranslation('DOWNLOADED_SUCCESSFULLY');

  String get STORAGE_PERMISSION_DENIED => getTranslation('STORAGE_PERMISSION_DENIED');

  String get DOWNLOAD_FAILED => getTranslation('DOWNLOAD_FAILED');

  String errorMessage(String error) => '$ERROR_PREFIX $error';

  String maximumFileSizeMessage(num maxFileSize) =>
      MAXIMUM_FILE_SIZE_IS.replaceAll('{maxFileSize}', '$maxFileSize');

  String deleteFileMessage(String name) => DELETE_FILE_MESSAGE.replaceAll('{name}', name);

  String fileAlreadyExistsInFolderMessage(String name) =>
      FILE_ALREADY_EXISTS_IN_FOLDER.replaceAll('{name}', name);

  String bytesTooShortMessage(int bytesLength) =>
      BYTES_TOO_SHORT.replaceAll('{bytes}', '$bytesLength');

  String previewNotAvailableMessage(String fileType) =>
      PREVIEW_NOT_AVAILABLE.replaceAll('{fileType}', fileType.toUpperCase());

  String itemCountLabel(int itemCount) => '$itemCount ${itemCount == 1 ? ITEM : ITEMS}';

  @override
  String get namespace => namespaceStatic;
}
