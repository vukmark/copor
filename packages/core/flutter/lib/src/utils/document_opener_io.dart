import 'dart:io';
import 'dart:typed_data';

import 'package:open_filex/open_filex.dart';
import 'package:path_provider/path_provider.dart';

///Implementation for non-web platforms
///This code is only compiled on non-web platforms
///
/// The bytes have to be materialised on disk first — there is no in-memory
/// handoff to the platform PDF viewer.
Future<void> openPdfImpl(Uint8List documentBuffer, String fileName) async {
  final tempDir = await getTemporaryDirectory();
  final file = File('${tempDir.path}/$fileName');
  await file.writeAsBytes(documentBuffer);
  await OpenFilex.open(file.path);
}
