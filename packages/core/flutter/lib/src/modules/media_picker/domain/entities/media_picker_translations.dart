// ignore_for_file: non_constant_identifier_names

/// Strings the core media picker and media-file widgets show (permissions,
/// file download, size limit). A module's translation class implements this
/// to hand them its translations.
abstract interface class MediaPickerTranslations {
  String get CAMERA_PERMISSION_DENIED;
  String get CAMERA_PERMISSION_PERMANENTLY_DENIED;
  String get CAMERA_PERMISSION_REQUIRED_TITLE;
  String get CANCEL;
  String get CONFIRM_DOWNLOAD;
  String get DOWNLOAD_FILE;
  String get DO_YOU_WANT_TO_DOWNLOAD;
  String get FAILED_TO_READ_FILE;
  String get FILE_DOWNLOADED_SUCCESSFULLY;
  String get FILE_DOWNLOAD_FAILED;
  String get FILE_TOO_LARGE;
  String get MAXIMUM_FILE_IS;
  String get OPEN_SETTINGS;
  String get STORAGE_PERMISSION_DENIED;
  String get STORAGE_PERMISSION_PERMANENTLY_DENIED;
}
