import 'package:copor_core/src/error/media_picker_failures.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';

class CameraDatasource {
  final ImagePicker _imagePicker;

  CameraDatasource({ImagePicker? imagePicker}) : _imagePicker = imagePicker ?? ImagePicker();

  Future<MediaFileModel> capture() async {
    final status = await Permission.camera.request();

    if (status.isPermanentlyDenied) {
      throw Failure(0, MediaPickerFailureKeys.cameraPermissionPermanentlyDenied);
    }

    if (!status.isGranted) {
      throw Failure(0, MediaPickerFailureKeys.cameraPermissionDenied);
    }

    final XFile? file = await _imagePicker.pickImage(source: ImageSource.camera);

    if (file == null) {
      throw Failure(0, '');
    }

    final bytes = await file.readAsBytes();
    final size = await file.length();
    final mimeType = file.mimeType != null
        ? MimeType.fromValue(file.mimeType)
        : MimeType.fromExtension(file.name.split('.').last);

    return MediaFileModel.fromData(
      name: file.name,
      bytes: bytes,
      size: size,
      type: mimeType,
      path: file.path,
    );
  }
}
