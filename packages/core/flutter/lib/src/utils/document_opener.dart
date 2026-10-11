import 'dart:typed_data';

import 'document_opener_io.dart' if (dart.library.js_interop) 'document_opener_web.dart';

///Helper class for opening PDF documents across platforms
class DocumentOpener {
  ///Opens a PDF held in memory using whatever the current platform offers:
  ///a new browser tab on web, the system viewer on mobile/desktop.
  ///
  /// Uses conditional import so each platform only compiles the implementation
  /// it can actually run — [fileName] is only meaningful off the web, where the
  /// bytes are written to a temp file before being handed to the system viewer.
  static Future<void> openPdf(Uint8List documentBuffer, {String fileName = 'document.pdf'}) =>
      openPdfImpl(documentBuffer, fileName);
}
