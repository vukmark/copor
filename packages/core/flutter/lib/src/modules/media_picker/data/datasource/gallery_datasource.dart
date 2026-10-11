import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:image_picker/image_picker.dart';
import 'package:copor_core/src/error/failure.dart';

import '../../../../data/model/media_file/mime_type.dart';

class GalleryDatasource {
  final ImagePicker _imagePicker;

  GalleryDatasource({ImagePicker? imagePicker}) : _imagePicker = imagePicker ?? ImagePicker();

  Future<List<MediaFileModel>> pick() async {
    final List<XFile> files = await _imagePicker.pickMultiImage();

    if (files.isEmpty) {
      throw Failure(0, '');
    }

    final List<MediaFileModel> mediaFiles = [];
    for (final file in files) {
      final bytes = await file.readAsBytes();
      final size = await file.length();
      var mimeType = MimeType.fromValue(file.mimeType);
      if (mimeType == MimeType.unknown) {
        mimeType = MimeType.fromExtension(file.name.split('.').last);
      }
      if (mimeType == MimeType.unknown) {
        mimeType = MimeType.detectMimeTypeFromBytes(bytes);
      }

      mediaFiles.add(
        MediaFileModel.fromData(name: file.name, bytes: bytes, size: size, type: mimeType),
      );
    }

    return mediaFiles;
  }
}
