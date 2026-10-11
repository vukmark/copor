import 'dart:math';
import 'package:flutter/material.dart';
import '../../theme/extensions/copor_theme.dart';

class DTRingLoader extends StatefulWidget {
  final double size;
  final double strokeWidth;

  /// How long one complete color cycle (all 5 colors) takes.
  final Duration cycleDuration;

  const DTRingLoader({
    super.key,
    this.size = 45,
    this.strokeWidth = 4,
    this.cycleDuration = const Duration(milliseconds: 4000),
  });

  /// Full-page / section loading indicator (45 × 4).
  const DTRingLoader.page({
    super.key,
    this.cycleDuration = const Duration(milliseconds: 4000),
  })  : size = 45,
        strokeWidth = 4;

  /// Inline / compact loading indicator (20 × 3).
  const DTRingLoader.inline({
    super.key,
    this.cycleDuration = const Duration(milliseconds: 4000),
  })  : size = 20,
        strokeWidth = 2;

  @override
  State<DTRingLoader> createState() => _DTRingLoaderState();
}

class _DTRingLoaderState extends State<DTRingLoader>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  /// Continuously increasing value.
  /// Integer part  = index of the currently dominant color.
  /// Fractional part = blend progress (0→1) into the next color.
  double _cycleT = 0.0;

  /// Current ring rotation in radians.
  double _rotation = 0.0;

  double _lastT = 0.0;

  static const int _colorCount = 5;
  static const double _small = 1 / 10;
  static const double _large = 6 / 10;

  /// Ring rotation speed: one full revolution per 3 s.
  static const double _rotSpeed = 2 * pi / 3000; // radians per ms

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(days: 999),
    )
      ..addListener(_onTick)
      ..forward();
  }

  void _onTick() {
    final now = _controller.lastElapsedDuration!.inMilliseconds.toDouble();
    final dt = now - _lastT;
    _lastT = now;
    if (dt <= 0) return;

    _rotation += _rotSpeed * dt;

    // Advance the cycle — each color occupies one unit.
    final cycleSpeedPerMs = _colorCount / widget.cycleDuration.inMilliseconds;
    _cycleT += cycleSpeedPerMs * dt;
  }

  static double _easeInOutCubic(double t) {
    return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
  }

  List<_Slice> _buildSlices(List<Color> colors) {
    final dominantIdx = _cycleT.floor() % _colorCount;
    final nextIdx = (dominantIdx + 1) % _colorCount;
    final blend = _easeInOutCubic(_cycleT - _cycleT.floorToDouble());

    final slices = <_Slice>[];
    for (int i = 0; i < _colorCount; i++) {
      final double frac;
      if (i == dominantIdx) {
        // Shrinks from large → small as blend goes 0 → 1.
        frac = _large * (1 - blend) + _small * blend;
      } else if (i == nextIdx) {
        // Grows from small → large as blend goes 0 → 1.
        frac = _small * (1 - blend) + _large * blend;
      } else {
        frac = _small;
      }
      slices.add(_Slice(color: colors[i], frac: frac));
    }
    return slices;
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = CoporTheme.of(context).colors;
    final colors = [c.primary, c.secondary, c.tertiary, c.success, c.error];

    return RepaintBoundary(
      child: SizedBox(
        width: widget.size,
        height: widget.size,
        child: AnimatedBuilder(
          animation: _controller,
          builder: (_, __) => CustomPaint(
            painter: _RingPainter(
              slices: _buildSlices(colors),
              rotation: _rotation,
              strokeWidth: widget.strokeWidth,
            ),
          ),
        ),
      ),
    );
  }
}

// ── Internal types ────────────────────────────────────────────────────────────

class _Slice {
  final Color color;
  final double frac; // portion of full circle (0 → 1)

  const _Slice({required this.color, required this.frac});
}

class _RingPainter extends CustomPainter {
  final List<_Slice> slices;
  final double rotation;
  final double strokeWidth;

  _RingPainter({
    required this.slices,
    required this.rotation,
    required this.strokeWidth,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final radius = (size.width - strokeWidth) / 2;

    // ── Shadow pass ───────────────────────────────────────────────────────────
    final shadowPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.butt
      ..color = const Color(0x1A000000) // black @ ~20 %
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);

    double angle = rotation;
    for (final s in slices) {
      final sweep = s.frac * 2 * pi;
      canvas.drawArc(
        Rect.fromCircle(center: Offset(cx, cy + 1.5), radius: radius),
        angle,
        sweep,
        false,
        shadowPaint,
      );
      angle += sweep;
    }

    // ── Foreground pass ───────────────────────────────────────────────────────
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.butt;

    angle = rotation;
    for (final s in slices) {
      final sweep = s.frac * 2 * pi;
      paint.color = s.color;
      canvas.drawArc(
        Rect.fromCircle(center: Offset(cx, cy), radius: radius),
        angle,
        sweep,
        false,
        paint,
      );
      angle += sweep;
    }
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.rotation != rotation || old.slices != slices;
}
