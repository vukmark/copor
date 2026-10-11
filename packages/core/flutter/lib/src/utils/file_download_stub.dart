import 'dart:typed_data';

class FileDownloadWeb {
  static void downloadFile(Uint8List bytes, String fileName) {
    throw UnsupportedError('File download is only supported on the web.');
  }
}
