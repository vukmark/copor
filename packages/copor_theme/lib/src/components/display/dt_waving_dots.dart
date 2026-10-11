import 'dart:math';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:flutter/material.dart';

const _kHeight = 10.0;
const _kAnimationDuration = Duration(seconds: 60);
const _kAnimationCycles = 4.0;
const _kSpeedQuantum = 1.0 / _kAnimationCycles;
const _kRngSeed = 43;

// Layer 1 — larger dots
const _kLayer1Spacing = 18.0;
const _kLayer1RadiusBase = 5.0;
const _kLayer1RadiusVariance = 6.0;
const _kLayer1BaseYFactor = 0.5;
const _kLayer1PhaseMultiplier = 4.0;
const _kLayer1SpeedBase = 0.4;
const _kLayer1SpeedVariance = 0.3;
const _kLayer1AmplitudeBase = 8.0;
const _kLayer1AmplitudeVariance = 50.0;

// Layer 2 — smaller dots
const _kLayer2Spacing = 26.0;
const _kLayer2RadiusBase = 3.0;
const _kLayer2RadiusVariance = 4.0;
const _kLayer2BaseYFactor = 0.45;
const _kLayer2PhaseOffset = 1.5;
const _kLayer2PhaseMultiplier = 3.0;
const _kLayer2SpeedBase = 0.25;
const _kLayer2SpeedVariance = 0.2;
const _kLayer2AmplitudeBase = 4.0;
const _kLayer2AmplitudeVariance = 35.0;

const _kHighlightProbability = 0.2;
const _kRegularOpacityBase = 0.05;
const _kRegularOpacityVariance = 0.06;
const _kHighlightOpacityBase = 0.38;
const _kHighlightOpacityVariance = 0.2;

const _kXAmplitudeBase = 2.0;
const _kXAmplitudeVariance = 4.0;
const _kXSpeedBase = 0.25;
const _kXSpeedVariance = 0.25;

const _kDriftAmplitude = 6.0;
const _kDriftSpeed = 0.25;

const _kOpacityPulseProbability = 0.5;
const _kRegularPulseAmplitudeBase = 0.03;
const _kRegularPulseAmplitudeVariance = 0.04;
const _kHighlightPulseAmplitudeBase = 0.15;
const _kHighlightPulseAmplitudeVariance = 0.15;
const _kOpacityPulseSpeedBase = 0.25;
const _kOpacityPulseSpeedVariance = 0.25;

class DTWavingDots extends StatefulWidget {
  final double height;

  const DTWavingDots({super.key, this.height = _kHeight});

  @override
  State<DTWavingDots> createState() => _DTWavingDotsState();
}

class _DTWavingDotsState extends State<DTWavingDots>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Color> _dotColors;

  List<_Dot>? _cachedDots;
  Size? _cachedSize;
  List<Color>? _cachedDotColors;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: _kAnimationDuration)
      ..repeat();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final dc = CoporColors.of(context);
    _dotColors = [dc.error, dc.tertiary, dc.success, dc.primary, dc.secondary];
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  List<_Dot> _getDots(Size size) {
    if (_cachedDots == null ||
        _cachedSize != size ||
        !identical(_cachedDotColors, _dotColors)) {
      _cachedDots = _buildDots(size, _dotColors);
      _cachedSize = size;
      _cachedDotColors = _dotColors;
    }
    return _cachedDots!;
  }

  static double _quantize(double value, double step) =>
      (value / step).roundToDouble() * step;

  static List<_Dot> _buildDots(Size size, List<Color> colors) {
    final rng = Random(_kRngSeed);
    final dots = <_Dot>[];
    final w = size.width;
    final h = size.height;

    final count1 = (w / _kLayer1Spacing).floor();
    for (int i = 0; i < count1; i++) {
      final isHighlight = rng.nextDouble() < _kHighlightProbability;
      final hasPulse = rng.nextDouble() < _kOpacityPulseProbability;
      dots.add(_Dot(
        x: (i / count1) * w * 1.1 - w * 0.05,
        baseY: h * _kLayer1BaseYFactor,
        radius: _kLayer1RadiusBase + rng.nextDouble() * _kLayer1RadiusVariance,
        color: colors[i % colors.length],
        phase: (i / count1) * pi * _kLayer1PhaseMultiplier,
        speed: _quantize(_kLayer1SpeedBase + rng.nextDouble() * _kLayer1SpeedVariance, _kSpeedQuantum),
        amplitude: _kLayer1AmplitudeBase + rng.nextDouble() * _kLayer1AmplitudeVariance,
        opacity: isHighlight
            ? _kHighlightOpacityBase + rng.nextDouble() * _kHighlightOpacityVariance
            : _kRegularOpacityBase + rng.nextDouble() * _kRegularOpacityVariance,
        opacityPhase: rng.nextDouble() * 2 * pi,
        opacitySpeed: hasPulse
            ? _quantize(_kOpacityPulseSpeedBase + rng.nextDouble() * _kOpacityPulseSpeedVariance, _kSpeedQuantum)
            : 0.0,
        opacityAmplitude: hasPulse
            ? (isHighlight
                ? _kHighlightPulseAmplitudeBase + rng.nextDouble() * _kHighlightPulseAmplitudeVariance
                : _kRegularPulseAmplitudeBase + rng.nextDouble() * _kRegularPulseAmplitudeVariance)
            : 0.0,
        xPhase: rng.nextDouble() * 2 * pi,
        xSpeed: _quantize(_kXSpeedBase + rng.nextDouble() * _kXSpeedVariance, _kSpeedQuantum),
        xAmplitude: _kXAmplitudeBase + rng.nextDouble() * _kXAmplitudeVariance,
      ));
    }

    final count2 = (w / _kLayer2Spacing).floor();
    for (int i = 0; i < count2; i++) {
      final isHighlight = rng.nextDouble() < _kHighlightProbability;
      final hasPulse = rng.nextDouble() < _kOpacityPulseProbability;
      dots.add(_Dot(
        x: (i / count2) * w * 1.1 - w * 0.05,
        baseY: h * _kLayer2BaseYFactor,
        radius: _kLayer2RadiusBase + rng.nextDouble() * _kLayer2RadiusVariance,
        color: colors[(i + 2) % colors.length],
        phase: (i / count2) * pi * _kLayer2PhaseMultiplier + _kLayer2PhaseOffset,
        speed: _quantize(_kLayer2SpeedBase + rng.nextDouble() * _kLayer2SpeedVariance, _kSpeedQuantum),
        amplitude: _kLayer2AmplitudeBase + rng.nextDouble() * _kLayer2AmplitudeVariance,
        opacity: isHighlight
            ? _kHighlightOpacityBase + rng.nextDouble() * _kHighlightOpacityVariance
            : _kRegularOpacityBase + rng.nextDouble() * _kRegularOpacityVariance,
        opacityPhase: rng.nextDouble() * 2 * pi,
        opacitySpeed: hasPulse
            ? _quantize(_kOpacityPulseSpeedBase + rng.nextDouble() * _kOpacityPulseSpeedVariance, _kSpeedQuantum)
            : 0.0,
        opacityAmplitude: hasPulse
            ? (isHighlight
                ? _kHighlightPulseAmplitudeBase + rng.nextDouble() * _kHighlightPulseAmplitudeVariance
                : _kRegularPulseAmplitudeBase + rng.nextDouble() * _kRegularPulseAmplitudeVariance)
            : 0.0,
        xPhase: rng.nextDouble() * 2 * pi,
        xSpeed: _quantize(_kXSpeedBase + rng.nextDouble() * _kXSpeedVariance, _kSpeedQuantum),
        xAmplitude: _kXAmplitudeBase + rng.nextDouble() * _kXAmplitudeVariance,
      ));
    }

    return dots;
  }

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: LayoutBuilder(
        builder: (context, constraints) {
          final size = Size(constraints.maxWidth, widget.height);
          final dots = _getDots(size);
          return SizedBox(
            width: double.infinity,
            height: widget.height,
            child: AnimatedBuilder(
              animation: _controller,
              builder: (context, _) => CustomPaint(
                painter: _WavingDotsPainter(
                  t: _controller.value * 2 * pi * _kAnimationCycles,
                  dots: dots,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _Dot {
  final double x;
  final double baseY;
  final double radius;
  final Color color;
  final double phase;
  final double speed;
  final double amplitude;
  final double opacity;
  final double opacityPhase;
  final double opacitySpeed;
  final double opacityAmplitude;
  final double xPhase;
  final double xSpeed;
  final double xAmplitude;

  const _Dot({
    required this.x,
    required this.baseY,
    required this.radius,
    required this.color,
    required this.phase,
    required this.speed,
    required this.amplitude,
    required this.opacity,
    required this.opacityPhase,
    required this.opacitySpeed,
    required this.opacityAmplitude,
    required this.xPhase,
    required this.xSpeed,
    required this.xAmplitude,
  });
}

class _WavingDotsPainter extends CustomPainter {
  final double t;
  final List<_Dot> dots;

  const _WavingDotsPainter({required this.t, required this.dots});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;
    final globalDrift = sin(t * _kDriftSpeed) * _kDriftAmplitude;
    for (final d in dots) {
      final x = d.x + sin(d.xPhase + t * d.xSpeed) * d.xAmplitude;
      final y = d.baseY + globalDrift + sin(d.phase + t * d.speed) * d.amplitude;
      final alpha = (d.opacity + sin(d.opacityPhase + t * d.opacitySpeed) * d.opacityAmplitude)
          .clamp(0.0, 1.0);
      paint.color = d.color.withValues(alpha: alpha);
      canvas.drawCircle(Offset(x, y), d.radius, paint);
    }
  }

  @override
  bool shouldRepaint(_WavingDotsPainter old) => old.t != t;
}
