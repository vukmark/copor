import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';
import 'package:copor_core/src/utils/file_download.dart';
import 'file_io_mobile.dart';

String extractContactName(String vCard) {
  final regex = RegExp(r'^FN:(.*)$', multiLine: true);
  final match = regex.firstMatch(vCard);
  if (match != null && match.groupCount >= 1) {
    return match.group(1)!.trim();
  }
  return 'contact';
}

String normalizeFileName(String name) {
  return name
      .trim()
      .toLowerCase()
      .replaceAll(RegExp(r'\s+'), '_')
      .replaceAll(RegExp(r'[^\w\-.]'), '');
}

String ensureVcfExtension(String filename) {
  if (!filename.toLowerCase().endsWith('.vcf')) {
    return '$filename.vcf';
  }
  return filename;
}

Future<void> shareVCard(String vCard, {String? filename}) async {
  final contactName = extractContactName(vCard);
  final safeName = normalizeFileName(contactName);
  final finalFilename = ensureVcfExtension(filename ?? safeName);

  if (kIsWeb) {
    final bytes = Uint8List.fromList(utf8.encode(vCard));
    FileDownloadWeb.downloadFile(bytes, finalFilename);
    return;
  }

  final tempDir = await getTemporaryDirectory();
  final filePath = '${tempDir.path}/$finalFilename';
  final file = File(filePath);

  await file.writeAsString(vCard, encoding: utf8);

  try {
    //final mimeType = Platform.isAndroid ? 'text/x-vcard' : 'text/vcard';
    final xFile = XFile(filePath, mimeType: 'text/vcard');
    final params = ShareParams(
      files: [xFile],
      fileNameOverrides: [finalFilename],
      text: 'Contact vCard',
      title: 'Share Contact',
    );

    await SharePlus.instance.share(params);
  } catch (e) {
    final fallbackParams = ShareParams(text: vCard, title: 'Contact vCard -');
    await SharePlus.instance.share(fallbackParams);
  } finally {
    if (await file.exists()) {
      await file.delete();
    }
  }
}

Future<String> saveVCardLocally(String vCard, {String? filename}) async {
  if (kIsWeb) {
    throw UnsupportedError(
      'saveVCardLocally is not supported on web; use FileDownloadWeb instead.',
    );
  }

  final contactName = extractContactName(vCard);
  final safeName = normalizeFileName(contactName);
  final finalFilename = ensureVcfExtension(filename ?? safeName);

  final bytes = utf8.encode(vCard);
  final path = await writeFile(Uint8List.fromList(bytes), finalFilename);
  return path;
}
