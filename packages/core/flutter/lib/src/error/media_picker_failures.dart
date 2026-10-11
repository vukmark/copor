import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'failure.dart';

class MediaPickerFailureKeys {
  MediaPickerFailureKeys._();

  static const cameraPermissionDenied = 'CAMERA_PERMISSION_DENIED';
  static const cameraPermissionPermanentlyDenied = 'CAMERA_PERMISSION_PERMANENTLY_DENIED';
  static const failedToReadFile = 'FAILED_TO_READ_FILE';
}

Failure translateFailure(Failure failure, MediaPickerTranslations translations) {
  final translatedMessage = switch (failure.message) {
    MediaPickerFailureKeys.cameraPermissionDenied => translations.CAMERA_PERMISSION_DENIED,
    MediaPickerFailureKeys.cameraPermissionPermanentlyDenied =>
      translations.CAMERA_PERMISSION_PERMANENTLY_DENIED,
    MediaPickerFailureKeys.failedToReadFile => translations.FAILED_TO_READ_FILE,
    _ => failure.message,
  };
  return Failure(failure.responseCode, translatedMessage);
}
