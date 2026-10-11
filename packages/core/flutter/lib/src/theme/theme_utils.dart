import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_theme/copor_theme.dart' as dt;
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';

export 'package:copor_theme/copor_theme.dart' show AppTheme;

class AppThemeHelper {
  static dt.AppTheme resolve(BuildContext context) {
    final prefs = context.watchState.preferences;
    final isInitial = prefs.isInitial;

    return dt.CoporThemeBuilder.build(
      themeMode: isInitial ? ThemeMode.system : prefs.ensuredData.themeMode,
      contrastMode: _dtContrastMode(_resolveContrast(context, prefs, isInitial)),
      fontWeight: isInitial
          ? dt.AppFontWeight.normal
          : dt.AppFontWeight.values[prefs.ensuredData.fontWeight.index],
      fontSize: isInitial
          ? dt.FontSize.normal
          : dt.FontSize.values[prefs.ensuredData.fontSize.index],
      accentPalette: isInitial ? null : _accentPalette(prefs.ensuredData.colorSet),
      baseTextTheme: Theme.of(context).textTheme,
    );
  }

  // The reduced colour sets swap the accent colours for ones that stay
  // distinguishable for more viewers; the primary stays the theme's (brand).
  static dt.CoporAccentPalette? _accentPalette(ColorSet colorSet) {
    return switch (colorSet) {
      ColorSet.SET22 => null,
      ColorSet.SET18 => const dt.CoporAccentPalette(
        secondary: kColorBlue,
        tertiary: kColorMagenta,
        success: kColorGreen,
        error: kColorRed,
      ),
      ColorSet.SET9 => const dt.CoporAccentPalette(
        secondary: kColorBlue,
        tertiary: kColorLavender,
        success: kColorYellow,
        error: kColorMaroon,
      ),
      ColorSet.SET5 => const dt.CoporAccentPalette(
        secondary: kColorBlue,
        tertiary: kColorGrey,
        success: kColorWhite,
        error: kColorBlack,
      ),
    };
  }

  static ContrastMode _resolveContrast(BuildContext context, prefs, bool isInitial) {
    final systemContrast = MediaQuery.of(context).highContrast
        ? ContrastMode.high
        : ContrastMode.normal;
    final saved = isInitial ? ContrastMode.auto : prefs.ensuredData.contrastMode;
    return saved == ContrastMode.auto ? systemContrast : saved;
  }

  static dt.ContrastMode _dtContrastMode(ContrastMode c) => dt.ContrastMode.values[c.index];
}
