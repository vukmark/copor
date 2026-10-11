import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/app_theme.dart';
import 'package:flutter/material.dart';

Color getColorBy(String name, BuildContext context) {
  final c = CoporColors.of(context);
  final colors = [c.primary, c.secondary, c.tertiary, c.success, c.error];
  return colors[name.hashCode.abs() % colors.length];
}

/// Returns black or white, whichever has better contrast against [background].
Color contrastingTextColor(Color background) {
  return ThemeData.estimateBrightnessForColor(background) == Brightness.dark
      ? Colors.white
      : Colors.black;
}

Color avatarInitialsColor(Color background, BuildContext context) {
  final config = Theme.of(context).extension<CoporThemeConfig>();
  return config?.useAdaptiveAccentContrast == true
      ? contrastingTextColor(background)
      : Colors.white;
}
