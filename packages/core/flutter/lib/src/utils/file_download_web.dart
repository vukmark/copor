import 'dart:typed_data';
import 'dart:js_interop';
import 'package:web/web.dart' as web;

@JS('Uint8Array')
extension type JSUint8Array._(JSObject _) {
  external factory JSUint8Array(JSArrayBuffer buffer);

  external JSArrayBuffer get buffer;
}

class FileDownloadWeb {
  static void downloadFile(Uint8List bytes, String fileName) {
    final JSArrayBuffer jsArrayBuffer = bytes.buffer.toJS;
    final JSUint8Array jsBytes = JSUint8Array(jsArrayBuffer);

    final blobParts = <JSAny>[jsBytes as JSAny].toJS;
    final blob = web.Blob(blobParts);
    final url = web.URL.createObjectURL(blob);

    final anchor = web.HTMLAnchorElement();
    anchor.href = url;
    anchor.download = fileName;
    anchor.style.display = 'none';

    web.document.body?.append(anchor);
    anchor.click();
    anchor.remove();

    web.URL.revokeObjectURL(url);
  }
}
