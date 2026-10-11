import 'dart:io';
import 'dart:ui';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/utils/file_download.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class FullscreenFileViewer extends StatelessWidget {
  final Uint8List bytes;
  final String thumbnail;
  final String filename;
  final Animation<double> animation;
  final CloudPageTranslation translations;

  const FullscreenFileViewer({
    super.key,
    required this.bytes,
    required this.thumbnail,
    required this.filename,
    required this.animation,
    required this.translations,
  });

  static void show(
    BuildContext context,
    Uint8List bytes,
    String thumbnail,
    String filename,
    CloudPageTranslation translations,
  ) {
    Navigator.of(context, rootNavigator: true).push(
      PageRouteBuilder(
        opaque: false,
        barrierDismissible: true,
        transitionDuration: const Duration(milliseconds: 350),
        reverseTransitionDuration: const Duration(milliseconds: 250),
        pageBuilder: (context, animation, secondaryAnimation) {
          return FullscreenFileViewer(
            bytes: bytes,
            thumbnail: thumbnail,
            filename: filename,
            animation: animation,
            translations: translations,
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          final blurValue = animation.value * 10.0;
          return Stack(
            fit: StackFit.expand,
            children: [
              GestureDetector(
                onTap: () => Navigator.of(context, rootNavigator: true).pop(),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: blurValue, sigmaY: blurValue),
                  child: Container(color: Colors.black.withValues(alpha: animation.value * 0.5)),
                ),
              ),
              FadeTransition(
                opacity: animation,
                child: _FileContent(
                  bytes: bytes,
                  thumbnail: thumbnail,
                  filename: filename,
                  translations: translations,
                ),
              ),
              Positioned(
                top: MediaQuery.paddingOf(context).top + 8,
                left: 8,
                child: FadeTransition(
                  opacity: animation,
                  child: IconButton(
                    onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
                    icon: const Icon(PhosphorIconsThin.x, color: Colors.white, size: 28),
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.black45,
                      shape: const CircleBorder(),
                    ),
                  ),
                ),
              ),
              Positioned(
                top: MediaQuery.paddingOf(context).top + 8,
                right: 8,
                child: FadeTransition(
                  opacity: animation,
                  child: _DownloadButton(
                    bytes: bytes,
                    filename: filename,
                    translations: translations,
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _FileContent extends StatelessWidget {
  final Uint8List bytes;
  final String thumbnail;
  final String filename;
  final CloudPageTranslation translations;

  const _FileContent({
    required this.bytes,
    required this.thumbnail,
    required this.filename,
    required this.translations,
  });

  @override
  Widget build(BuildContext context) {
    return switch (thumbnail) {
      'IMAGE' => _ImageViewer(bytes: bytes),
      'PDF' => _PdfViewer(bytes: bytes, translations: translations),
      _ => _NoPreview(thumbnail: thumbnail, filename: filename, translations: translations),
    };
  }
}

class _ImageViewer extends StatelessWidget {
  final Uint8List bytes;

  const _ImageViewer({required this.bytes});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: InteractiveViewer(
        minScale: 0.5,
        maxScale: 4.0,
        child: Image(
          image: MemoryImage(bytes),
          fit: BoxFit.contain,
          errorBuilder: (context, _, _) =>
              const Icon(PhosphorIconsThin.imageBroken, size: 64, color: Colors.white54),
        ),
      ),
    );
  }
}

class _PdfViewer extends StatefulWidget {
  final Uint8List bytes;
  final CloudPageTranslation translations;

  const _PdfViewer({required this.bytes, required this.translations});

  @override
  State<_PdfViewer> createState() => _PdfViewerState();
}

class _PdfViewerState extends State<_PdfViewer> {
  String? _error;
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    if (widget.bytes.length >= 4) {
      final header = widget.bytes.sublist(0, 4);
      final isPdf =
          header[0] == 0x25 && header[1] == 0x50 && header[2] == 0x44 && header[3] == 0x46;
      if (!isPdf) {
        _error = widget.translations.INVALID_PDF_DATA;
      }
    } else {
      _error = widget.translations.bytesTooShortMessage(widget.bytes.length);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_error != null) {
      return Center(
        child: Container(
          margin: const EdgeInsets.all(32),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.black.withValues(alpha: 0.8),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(PhosphorIconsThin.warningCircle, color: Colors.redAccent, size: 48),
              const SizedBox(height: 16),
              Text(
                widget.translations.PDF_LOAD_ERROR,
                style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              Text(
                _error!,
                style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 13),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      );
    }

    return Stack(
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 60, bottom: 10, right: 10, left: 10),
          child: SfPdfViewer.memory(
            widget.bytes,
            onDocumentLoaded: (details) {
              setState(() => _loaded = true);
            },
            onDocumentLoadFailed: (details) {
              setState(() => _error = '${details.error}: ${details.description}');
            },
          ),
        ),
        if (!_loaded) Container(),
      ],
    );
  }
}

class _NoPreview extends StatelessWidget {
  final String thumbnail;
  final String filename;
  final CloudPageTranslation translations;

  const _NoPreview({required this.thumbnail, required this.filename, required this.translations});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 32),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.7),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            FileExtensionIcon(thumbnail: thumbnail, size: 35),
            const SizedBox(height: 16),
            Text(
              filename,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 8),
            Text(
              translations.previewNotAvailableMessage(thumbnail),
              style: TextStyle(color: Colors.white.withValues(alpha: 0.6), fontSize: 13),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class _DownloadButton extends StatefulWidget {
  final Uint8List bytes;
  final String filename;
  final CloudPageTranslation translations;

  const _DownloadButton({required this.bytes, required this.filename, required this.translations});

  @override
  State<_DownloadButton> createState() => _DownloadButtonState();
}

class _DownloadButtonState extends State<_DownloadButton> {
  bool _loading = false;

  void _banner(String message, {bool failure = false}) {
    context.getBloc.appScaffold.addBanner(
      failure
          ? DSBanner.error(message, source: 'file_download')
          : DSBanner.success(message, source: 'file_download'),
    );
  }

  Future<void> _onTap() async {
    if (_loading) return;
    setState(() => _loading = true);
    await _downloadFile();
    if (mounted) setState(() => _loading = false);
  }

  Future<void> _downloadFile() async {
    try {
      if (kIsWeb) {
        FileDownloadWeb.downloadFile(widget.bytes, widget.filename);
        if (!mounted) return;
        _banner(widget.translations.DOWNLOADED_SUCCESSFULLY);
        return;
      }

      if (Platform.isAndroid) {
        const methodChannel = MethodChannel('com.example.copor/file_saver');
        try {
          await methodChannel.invokeMethod('saveToDownloads', {
            'bytes': widget.bytes,
            'filename': widget.filename,
          });
          if (!mounted) return;
          _banner(widget.translations.DOWNLOADED_SUCCESSFULLY);
        } on PlatformException catch (e) {
          if (e.code == 'PERMISSION_DENIED') {
            final status = await Permission.storage.request();
            if (!mounted) return;
            if (!status.isGranted) {
              if (status.isPermanentlyDenied) openAppSettings();
              _banner(widget.translations.STORAGE_PERMISSION_DENIED, failure: true);
              return;
            }
            await methodChannel.invokeMethod('saveToDownloads', {
              'bytes': widget.bytes,
              'filename': widget.filename,
            });
            if (!mounted) return;
            _banner(widget.translations.DOWNLOADED_SUCCESSFULLY);
          } else {
            rethrow;
          }
        }
      } else if (Platform.isIOS) {
        final documentsDir = await getApplicationDocumentsDirectory();
        final savePath = '${documentsDir.path}/${widget.filename}';
        await File(savePath).writeAsBytes(widget.bytes);
        if (!mounted) return;
        _banner(widget.translations.DOWNLOADED_SUCCESSFULLY);
      }
    } catch (_) {
      if (!mounted) return;
      _banner(widget.translations.DOWNLOAD_FAILED, failure: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: _loading ? null : _onTap,
      icon: _loading
          ? SizedBox(width: 20, height: 20, child: Container())
          : const Icon(PhosphorIconsThin.download, color: Colors.white, size: 28),
      style: IconButton.styleFrom(backgroundColor: Colors.black45, shape: const CircleBorder()),
    );
  }
}
