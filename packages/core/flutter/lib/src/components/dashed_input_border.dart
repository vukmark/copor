import 'package:flutter/material.dart';

class DashedInputBorder extends OutlineInputBorder {
  final double dashLength;
  final double gapLength;

  const DashedInputBorder({
    super.borderRadius = const BorderRadius.all(Radius.circular(5)),
    super.borderSide = const BorderSide(),
    this.dashLength = 6.0,
    this.gapLength = 3.0,
  });

  @override
  void paint(
    Canvas canvas,
    Rect rect, {
    double? gapExtent,
    double gapPercentage = 0.0,
    double? gapStart,
    TextDirection? textDirection,
  }) {
    final rrect = borderRadius.toRRect(rect);
    final paint = borderSide.toPaint();

    if (gapStart != null && gapExtent != null && gapPercentage > 0) {
      const double gapPadding = 6.0;
      final double scaledGap = gapExtent * gapPercentage;
      final double gapLeft = rect.left + gapStart - gapPadding;
      final double gapRight = gapLeft + scaledGap + gapPadding * 2;

      canvas.save();
      canvas.clipRect(Rect.fromLTRB(rect.left - 1, rect.top - 8, gapLeft, rect.bottom + 8));
      _drawDashes(canvas, rrect, paint);
      canvas.restore();

      canvas.save();
      canvas.clipRect(Rect.fromLTRB(gapRight, rect.top - 8, rect.right + 1, rect.bottom + 8));
      _drawDashes(canvas, rrect, paint);
      canvas.restore();

      canvas.save();
      canvas.clipRect(
        Rect.fromLTRB(rect.left - 1, rect.top + borderSide.width, rect.right + 1, rect.bottom + 8),
      );
      _drawDashes(canvas, rrect, paint);
      canvas.restore();
    } else {
      _drawDashes(canvas, rrect, paint);
    }
  }

  void _drawDashes(Canvas canvas, RRect rrect, Paint paint) {
    final path = Path()..addRRect(rrect);
    for (final metric in path.computeMetrics()) {
      double distance = 0.0;
      while (distance < metric.length) {
        final double next = distance + dashLength;
        canvas.drawPath(metric.extractPath(distance, next.clamp(0, metric.length)), paint);
        distance = next + gapLength;
      }
    }
  }

  static InputDecoration buildDecoration({
    required BuildContext context,
    required String labelText,
    Widget? suffixIcon,
    String? errorText,
    EdgeInsetsGeometry? contentPadding,
  }) {
    contentPadding ??= const EdgeInsets.symmetric(horizontal: 8, vertical: 12);
    final scheme = Theme.of(context).colorScheme;
    return InputDecoration(
      labelText: labelText,
      suffixIcon: suffixIcon,
      errorText: errorText,
      contentPadding: contentPadding,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(5)),
      errorBorder: DashedInputBorder(
        borderRadius: BorderRadius.circular(5),
        borderSide: BorderSide(color: scheme.error, width: 1.5),
      ),
      focusedErrorBorder: DashedInputBorder(
        borderRadius: BorderRadius.circular(5),
        borderSide: BorderSide(color: scheme.error, width: 1.5),
      ),
      labelStyle: WidgetStateTextStyle.resolveWith((states) {
        if (states.contains(WidgetState.error)) return TextStyle(color: scheme.error);
        if (states.contains(WidgetState.focused)) return TextStyle(color: scheme.primary);
        return TextStyle(color: Theme.of(context).textTheme.bodyMedium?.color);
      }),
      floatingLabelStyle: WidgetStateTextStyle.resolveWith((states) {
        if (states.contains(WidgetState.error)) return TextStyle(color: scheme.error);
        if (states.contains(WidgetState.focused)) return TextStyle(color: scheme.primary);
        return TextStyle(color: Theme.of(context).textTheme.bodyMedium?.color);
      }),
      suffixIconColor: WidgetStateColor.resolveWith((states) {
        if (states.contains(WidgetState.error)) return scheme.error;
        if (states.contains(WidgetState.focused)) return scheme.primary;
        return scheme.onSurfaceVariant;
      }),
    );
  }
}
