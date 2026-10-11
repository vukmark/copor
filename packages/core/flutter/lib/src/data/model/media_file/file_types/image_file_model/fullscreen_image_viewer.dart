import 'dart:ui';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/image_downloader.dart';
import 'package:flutter/material.dart';

class FullscreenImageViewer extends StatelessWidget {
  final ImageProvider imageProvider;
  final Animation<double> animation;
  final String? filename;

  const FullscreenImageViewer({
    super.key,
    required this.imageProvider,
    required this.animation,
    this.filename,
  });

  static void show(BuildContext context, ImageProvider imageProvider, String? filename) {
    Navigator.of(context, rootNavigator: true).push(
      PageRouteBuilder(
        opaque: false,
        barrierDismissible: true,
        transitionDuration: const Duration(milliseconds: 350),
        reverseTransitionDuration: const Duration(milliseconds: 250),
        pageBuilder: (context, animation, secondaryAnimation) {
          return FullscreenImageViewer(
            imageProvider: imageProvider,
            animation: animation,
            filename: filename,
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
                child: Center(
                  child: InteractiveViewer(
                    minScale: 0.5,
                    maxScale: 4.0,
                    child: Image(
                      image: imageProvider,
                      fit: BoxFit.contain,
                      errorBuilder: (context, _, _) => const Icon(
                        PhosphorIconsThin.imageBroken,
                        size: 64,
                        color: Colors.white54,
                      ),
                    ),
                  ),
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
                  child: _DownloadButton(imageProvider: imageProvider, filename: filename),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _DownloadButton extends StatefulWidget {
  final ImageProvider imageProvider;
  final String? filename;

  const _DownloadButton({required this.imageProvider, this.filename});

  @override
  State<_DownloadButton> createState() => _DownloadButtonState();
}

class _DownloadButtonState extends State<_DownloadButton> {
  bool _loading = false;

  Future<void> _onTap() async {
    if (_loading) return;
    setState(() => _loading = true);
    await downloadImage(context, widget.imageProvider, filename: widget.filename ?? 'image.png');
    if (mounted) setState(() => _loading = false);
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
