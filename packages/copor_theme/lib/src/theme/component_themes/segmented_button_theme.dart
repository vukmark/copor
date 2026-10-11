import 'package:copor_theme/copor_theme.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:flutter/material.dart';

@immutable
class DTSegmentedButtonThemeData extends ThemeExtension<DTSegmentedButtonThemeData> {
  final ButtonStyle style;

  const DTSegmentedButtonThemeData({required this.style});

  factory DTSegmentedButtonThemeData.fromScheme(CoporColorScheme s) {
    final primary = s.onPrimaryContainer!;
    final onSurface = s.onSurface!;
    final border = s.outline!;
    final surfaceSelected = s.primaryContainer!;
    final surfaceUnselected = s.surfaceContainer!;

    return DTSegmentedButtonThemeData(
      style: ButtonStyle(
        padding: WidgetStateProperty.all(const EdgeInsets.symmetric(vertical: 0, horizontal: 15)),
        shape: WidgetStateProperty.all(
          const RoundedRectangleBorder(borderRadius: BorderRadius.all(radius),),
        ),
        side: WidgetStateProperty.all(BorderSide(color: border)),
        backgroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return surfaceSelected;
          if (states.contains(WidgetState.hovered)) return primary.withValues(alpha: 0.05);
          return surfaceUnselected;
        }),
        foregroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return primary;
          return onSurface;
        }),
        textStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const TextStyle(fontWeight: FontWeight.w600, fontSize: 13);
          }
          return const TextStyle(fontWeight: FontWeight.w400, fontSize: 13);
        }),
        overlayColor: WidgetStateProperty.all(Colors.transparent),
      ),
    );
  }

  static DTSegmentedButtonThemeData of(BuildContext context) =>
      Theme.of(context).extension<DTSegmentedButtonThemeData>()!;

  @override
  DTSegmentedButtonThemeData copyWith({ButtonStyle? style}) {
    return DTSegmentedButtonThemeData(style: style ?? this.style);
  }

  @override
  DTSegmentedButtonThemeData lerp(ThemeExtension<DTSegmentedButtonThemeData>? other, double t) {
    if (other is! DTSegmentedButtonThemeData) return this;
    return DTSegmentedButtonThemeData(
      style: ButtonStyle.lerp(style, other.style, t)!,
    );
  }
}
