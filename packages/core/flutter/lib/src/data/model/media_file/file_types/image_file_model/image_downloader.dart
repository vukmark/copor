import 'dart:async';
import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/utils/file_download.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

void _banner(BuildContext context, String message, {bool failure = false}) {
  context.getBloc.appScaffold.addBanner(
    failure
        ? DSBanner.error(message, source: 'image_downloader')
        : DSBanner.success(message, source: 'image_downloader'),
  );
}

Future<Uint8List?> resolveImageBytes(ImageProvider provider) async {
  final completer = Completer<ui.Image>();
  late ImageStreamListener listener;
  final stream = provider.resolve(ImageConfiguration.empty);

  listener = ImageStreamListener(
    (info, _) {
      if (!completer.isCompleted) completer.complete(info.image);
      stream.removeListener(listener);
    },
    onError: (e, st) {
      if (!completer.isCompleted) completer.completeError(e, st);
      stream.removeListener(listener);
    },
  );

  stream.addListener(listener);

  final image = await completer.future;
  final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
  return byteData?.buffer.asUint8List();
}

Future<void> downloadImage(
  BuildContext context,
  ImageProvider imageProvider, {
  String filename = 'image.png',
}) async {
  final bytes = await resolveImageBytes(imageProvider);

  if (bytes == null) {
    if (!context.mounted) return;
    _banner(context, 'Download failed', failure: true);
    return;
  }

  try {
    if (kIsWeb) {
      FileDownloadWeb.downloadFile(bytes, filename);
      if (!context.mounted) return;
      _banner(context, 'Downloaded successfully');
      return;
    }

    if (Platform.isAndroid) {
      final status = await Permission.storage.request();
      if (!context.mounted) return;

      if (status.isPermanentlyDenied) {
        _banner(context, 'Storage permission permanently denied', failure: true);
        openAppSettings();
        return;
      }
      if (!status.isGranted && !status.isLimited) {
        _banner(context, 'Storage permission denied', failure: true);
        return;
      }

      final savePath = '/storage/emulated/0/Download/$filename';
      await File(savePath).writeAsBytes(bytes);
      if (!context.mounted) return;
      _banner(context, 'Downloaded successfully');
    } else if (Platform.isIOS) {
      final documentsDir = await getApplicationDocumentsDirectory();
      final savePath = '${documentsDir.path}/$filename';
      await File(savePath).writeAsBytes(bytes);
      if (!context.mounted) return;
      _banner(context, 'Downloaded successfully');
    }
  } catch (_) {
    if (!context.mounted) return;
    _banner(context, 'Download failed', failure: true);
  }
}
