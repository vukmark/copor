import 'package:desktop_drop/desktop_drop.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class UploadDropZone extends StatefulWidget {
  final VoidCallback onBrowse;
  final ValueChanged<List<DropItem>> onFilesDropped;
  final String browseLabel;
  final String dropFilesLabel;
  final IconData icon;

  const UploadDropZone({
    super.key,
    required this.onBrowse,
    required this.onFilesDropped,
    required this.browseLabel,
    required this.dropFilesLabel,
    this.icon = PhosphorIconsThin.cloudArrowUp,
  });

  @override
  State<UploadDropZone> createState() => _UploadDropZoneState();
}

class _UploadDropZoneState extends State<UploadDropZone> {
  bool _isDragging = false;

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);

    final content = CustomPaint(
      painter: _DashedBorderPainter(
        color: _isDragging ? colors.primary : colors.outline,
        borderRadius: 12,
        dashWidth: 6,
        dashSpace: 4,
      ),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        width: double.infinity,
        color: _isDragging ? colors.primary.withValues(alpha: 0.06) : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 28),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(widget.icon, size: 40, color: colors.onSurfaceSubtle),
              const SizedBox(height: 8),
              if (kIsWeb) ...[
                Text(
                  widget.dropFilesLabel,
                  textAlign: TextAlign.center,
                  style: CoporTextStyles.of(context).bodySecondary,
                ),
                const SizedBox(height: 12),
              ],
              DTButton.surface(
                icon: PhosphorIconsThin.folderOpen,
                label: widget.browseLabel,
                onPressed: widget.onBrowse,
              ),
            ],
          ),
        ),
      ),
    );

    if (!kIsWeb) return content;

    return DropTarget(
      onDragEntered: (_) => setState(() => _isDragging = true),
      onDragExited: (_) => setState(() => _isDragging = false),
      onDragDone: (details) {
        setState(() => _isDragging = false);
        widget.onFilesDropped(details.files);
      },
      child: content,
    );
  }
}

class _DashedBorderPainter extends CustomPainter {
  final Color color;
  final double borderRadius;
  final double dashWidth;
  final double dashSpace;

  _DashedBorderPainter({
    required this.color,
    this.borderRadius = 12,
    this.dashWidth = 6,
    this.dashSpace = 4,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke;

    final path = Path()
      ..addRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(0, 0, size.width, size.height),
          Radius.circular(borderRadius),
        ),
      );

    final dashedPath = _createDashedPath(path);
    canvas.drawPath(dashedPath, paint);
  }

  Path _createDashedPath(Path source) {
    final dashedPath = Path();
    for (final metric in source.computeMetrics()) {
      var distance = 0.0;
      while (distance < metric.length) {
        final end = (distance + dashWidth).clamp(0.0, metric.length);
        dashedPath.addPath(metric.extractPath(distance, end), Offset.zero);
        distance += dashWidth + dashSpace;
      }
    }
    return dashedPath;
  }

  @override
  bool shouldRepaint(covariant _DashedBorderPainter oldDelegate) =>
      color != oldDelegate.color ||
      borderRadius != oldDelegate.borderRadius ||
      dashWidth != oldDelegate.dashWidth ||
      dashSpace != oldDelegate.dashSpace;
}
