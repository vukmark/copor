import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/error/media_picker_failures.dart';
import 'package:file_picker/file_picker.dart';
import 'package:copor_core/src/error/failure.dart';

class FileDatasource {
  Future<List<MediaFileModel>> pick() async {
    final result = await FilePicker.platform.pickFiles(withData: true, allowMultiple: true);
    if (result == null || result.files.isEmpty) {
      throw Failure(0, '');
    }

    return result.files.map((file) {
      if (file.bytes == null) {
        throw Failure(0, MediaPickerFailureKeys.failedToReadFile);
      }

      final extension = file.extension?.toLowerCase() ?? '';
      var mimeType = MimeType.fromExtension(extension);
      if (mimeType == MimeType.unknown) {
        mimeType = MimeType.detectMimeTypeFromBytes(file.bytes!);
      }

      return MediaFileModel.fromData(name: file.name, bytes: file.bytes!, type: mimeType);
    }).toList();
  }
}
