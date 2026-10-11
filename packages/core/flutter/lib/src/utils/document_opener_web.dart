import 'dart:typed_data';
import 'dart:js_interop';
import 'package:web/web.dart';

///Implementation for web
///This code is only compiled on web
Future<void> openPdfImpl(Uint8List documentBuffer, String fileName) async {
  final document = Blob([documentBuffer.toJS].toJS, BlobPropertyBag(type: 'application/pdf'));
  final documentUrl = URL.createObjectURL(document);

  window.open(documentUrl);

  Future.delayed(const Duration(seconds: 5), () {
    URL.revokeObjectURL(documentUrl);
  });
}
