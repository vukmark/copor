import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/component_themes/button_theme.dart';
import 'package:copor_theme/src/theme/component_themes/input_theme.dart';
import 'package:copor_theme/src/theme/component_themes/segmented_button_theme.dart';
import 'package:flutter/material.dart';

// ── Design-system configuration enums ────────────────────────────────────────

enum ContrastMode { auto, normal, high }

enum AppFontWeight { light, normal, bold }

enum FontSize { xs, sm, normal, lg, xl, xxl }

double fontSizeToScale(FontSize fontSize) {
  switch (fontSize) {
    case FontSize.xs:
      return 0.8;
    case FontSize.sm:
      return 0.9;
    case FontSize.normal:
      return 1.0;
    case FontSize.lg:
      return 1.1;
    case FontSize.xl:
      return 1.3;
    case FontSize.xxl:
      return 1.5;
  }
}

// ── CoporThemeConfig ThemeExtension ──────────────────────────────────────────

/// Stores design-system configuration values baked into the active theme so
/// [CoporTextStyles] can produce correctly-weighted styles without extra params.
class CoporThemeConfig extends ThemeExtension<CoporThemeConfig> {
  final AppFontWeight fontWeight;
  final bool useAdaptiveAccentContrast;

  const CoporThemeConfig({
    this.fontWeight = AppFontWeight.normal,
    this.useAdaptiveAccentContrast = false,
  });

  @override
  CoporThemeConfig copyWith({AppFontWeight? fontWeight, bool? useAdaptiveAccentContrast}) =>
      CoporThemeConfig(
        fontWeight: fontWeight ?? this.fontWeight,
        useAdaptiveAccentContrast: useAdaptiveAccentContrast ?? this.useAdaptiveAccentContrast,
      );

  @override
  CoporThemeConfig lerp(CoporThemeConfig? other, double t) => t < 0.5 ? this : (other ?? this);
}

// ── AppTheme result ───────────────────────────────────────────────────────────

class AppTheme {
  final ThemeMode themeMode;
  final ThemeData lightTheme;
  final ThemeData darkTheme;

  const AppTheme({required this.themeMode, required this.lightTheme, required this.darkTheme});
}

/// Semantic accent colors used by design-system components. Without
/// [primary] the theme keeps its own (brand) primary for light and dark.
class CoporAccentPalette {
  final Color? primary;
  final Color secondary;
  final Color tertiary;
  final Color success;
  final Color error;

  const CoporAccentPalette({
    this.primary,
    required this.secondary,
    required this.tertiary,
    required this.success,
    required this.error,
  });
}

// ── Color schemes ─────────────────────────────────────────────────────────────

ColorScheme _lightNormalContrastScheme() {
  return const ColorScheme(
    brightness: Brightness.light,
    primary: Color(0xffc2410c),
    onPrimary: Color(0xffffffff),
    primaryContainer: Color(0xffea580c),
    onPrimaryContainer: Color(0xffffffff),
    secondary: Color(0xff475569),
    onSecondary: Color(0xffffffff),
    secondaryContainer: Color(0xff64748b),
    onSecondaryContainer: Color(0xffffffff),
    tertiary: Color(0xfff2713c),
    onTertiary: Color(0xff1c1917),
    tertiaryContainer: Color(0xfffdba8c),
    onTertiaryContainer: Color(0xff431407),
    error: Color(0xffb91c1c),
    onError: Color(0xffffffff),
    errorContainer: Color(0xffdc2626),
    onErrorContainer: Color(0xffffffff),
    surface: Color(0xfffafaf9),
    onSurface: Color(0xff1c1917),
    onSurfaceVariant: Color(0xff44403c),
    outline: Color(0xffd6d3d1),
    outlineVariant: Color(0xffe7e5e4),
    shadow: Color(0xff000000),
    scrim: Color(0xff000000),
    inverseSurface: Color(0xff292524),
    inversePrimary: Color(0xfffdba74),
    surfaceTint: Color(0x27d6d3d1),
    primaryFixed: Color(0xffea580c),
    onPrimaryFixed: Color(0xffffffff),
    primaryFixedDim: Color(0xffc2410c),
    onPrimaryFixedVariant: Color(0xffffffff),
    secondaryFixed: Color(0xff64748b),
    onSecondaryFixed: Color(0xffffffff),
    secondaryFixedDim: Color(0xff475569),
    onSecondaryFixedVariant: Color(0xffffffff),
    tertiaryFixed: Color(0xfff2713c),
    onTertiaryFixed: Color(0xff1c1917),
    tertiaryFixedDim: Color(0xffffedd5),
    onTertiaryFixedVariant: Color(0xff431407),
    surfaceDim: Color(0xffe7e5e4),
    surfaceBright: Color(0xffffffff),
    surfaceContainerLowest: Color(0xffffffff),
    surfaceContainerLow: Color(0xfff5f5f4),
    surfaceContainer: Color(0xffffffff),
    surfaceContainerHigh: Color(0xfff0efee),
    surfaceContainerHighest: Color(0xffe7e5e4),
  );
}

ColorScheme _lightHighContrastScheme() {
  return const ColorScheme(
    brightness: Brightness.light,
    primary: Color(0xff9a3412),
    onPrimary: Color(0xffffffff),
    primaryContainer: Color(0xffc2410c),
    onPrimaryContainer: Color(0xffffffff),
    secondary: Color(0xff334155),
    onSecondary: Color(0xffffffff),
    secondaryContainer: Color(0xff475569),
    onSecondaryContainer: Color(0xffffffff),
    tertiary: Color(0xff7c2d12),
    onTertiary: Color(0xffffffff),
    tertiaryContainer: Color(0xffc2410c),
    onTertiaryContainer: Color(0xffffffff),
    error: Color(0xff991b1b),
    onError: Color(0xffffffff),
    errorContainer: Color(0xffb91c1c),
    onErrorContainer: Color(0xffffffff),
    surface: Color(0xffffffff),
    onSurface: Color(0xff0c0a09),
    onSurfaceVariant: Color(0xff292524),
    outline: Color(0xffa8a29e),
    outlineVariant: Color(0xffd6d3d1),
    shadow: Color(0xff000000),
    scrim: Color(0xff000000),
    inverseSurface: Color(0xff292524),
    inversePrimary: Color(0xffffedd5),
    surfaceTint: Color(0x0b000000),
    primaryFixed: Color(0xff7c2d12),
    onPrimaryFixed: Color(0xffffffff),
    primaryFixedDim: Color(0xff431407),
    onPrimaryFixedVariant: Color(0xffffffff),
    secondaryFixed: Color(0xff334155),
    onSecondaryFixed: Color(0xffffffff),
    secondaryFixedDim: Color(0xff1e293b),
    onSecondaryFixedVariant: Color(0xffffffff),
    tertiaryFixed: Color(0xff7c2d12),
    onTertiaryFixed: Color(0xffffffff),
    tertiaryFixedDim: Color(0xff431407),
    onTertiaryFixedVariant: Color(0xffffffff),
    surfaceDim: Color(0x15000000),
    surfaceBright: Color(0xffffffff),
    surfaceContainerLowest: Color(0xfffafaf9),
    surfaceContainerLow: Color(0xfff5f5f4),
    surfaceContainer: Color(0xffffffff),
    surfaceContainerHigh: Color(0xfff0efee),
    surfaceContainerHighest: Color(0xffe7e5e4),
  );
}

ColorScheme _darkNormalContrastScheme() {
  return const ColorScheme(
    brightness: Brightness.dark,
    primary: Color(0xfffb923c),
    onPrimary: Color(0xff1c1917),
    primaryContainer: Color(0xfff97316),
    onPrimaryContainer: Color(0xff000000),
    secondary: Color(0xffcbd5e1),
    onSecondary: Color(0xff0f172a),
    secondaryContainer: Color(0xff94a3b8),
    onSecondaryContainer: Color(0xff000000),
    tertiary: Color(0xfffdba8c),
    onTertiary: Color(0xff431407),
    tertiaryContainer: Color(0xfff2713c),
    onTertiaryContainer: Color(0xff000000),
    error: Color(0xfffca5a5),
    onError: Color(0xff450a0a),
    errorContainer: Color(0xffef4444),
    onErrorContainer: Color(0xff000000),
    surface: Color(0xff1c1917),
    onSurface: Color(0xfff5f5f4),
    onSurfaceVariant: Color(0xffd6d3d1),
    outline: Color(0xff78716c),
    outlineVariant: Color(0xff57534e),
    shadow: Color(0xff000000),
    scrim: Color(0xff000000),
    inverseSurface: Color(0xffe7e5e4),
    inversePrimary: Color(0xffc2410c),
    surfaceTint: Color(0x0b000000),
    primaryFixed: Color(0xffffedd5),
    onPrimaryFixed: Color(0xff431407),
    primaryFixedDim: Color(0xfffdba74),
    onPrimaryFixedVariant: Color(0xff7c2d12),
    secondaryFixed: Color(0xffe2e8f0),
    onSecondaryFixed: Color(0xff0f172a),
    secondaryFixedDim: Color(0xffcbd5e1),
    onSecondaryFixedVariant: Color(0xff334155),
    tertiaryFixed: Color(0xffffedd5),
    onTertiaryFixed: Color(0xff431407),
    tertiaryFixedDim: Color(0xfffdba8c),
    onTertiaryFixedVariant: Color(0xff7c2d12),
    surfaceDim: Color(0xff0c0a09),
    surfaceBright: Color(0xff44403c),
    surfaceContainerLowest: Color(0xff161412),
    surfaceContainerLow: Color(0xff1f1c1a),
    surfaceContainer: Color(0xff262220),
    surfaceContainerHigh: Color(0xff2c2826),
    surfaceContainerHighest: Color(0xff35302d),
  );
}

ColorScheme _darkHighContrastScheme() {
  return const ColorScheme(
    brightness: Brightness.dark,
    primary: Color(0xfffdba74),
    onPrimary: Color(0xff000000),
    primaryContainer: Color(0xfffb923c),
    onPrimaryContainer: Color(0xff000000),
    secondary: Color(0xffe2e8f0),
    onSecondary: Color(0xff000000),
    secondaryContainer: Color(0xffcbd5e1),
    onSecondaryContainer: Color(0xff000000),
    tertiary: Color(0xfffff7ed),
    onTertiary: Color(0xff000000),
    tertiaryContainer: Color(0xfffdba8c),
    onTertiaryContainer: Color(0xff000000),
    error: Color(0xfff87171),
    onError: Color(0xff000000),
    errorContainer: Color(0xfffca5a5),
    onErrorContainer: Color(0xff000000),
    surface: Color(0xff0c0a09),
    onSurface: Color(0xfffafaf9),
    onSurfaceVariant: Color(0xffe7e5e4),
    outline: Color(0xffa8a29e),
    outlineVariant: Color(0xff78716c),
    shadow: Color(0xff000000),
    scrim: Color(0xff000000),
    inverseSurface: Color(0xffe7e5e4),
    inversePrimary: Color(0xff7c2d12),
    surfaceTint: Color(0x27d6d3d1),
    primaryFixed: Color(0xffffedd5),
    onPrimaryFixed: Color(0xff000000),
    primaryFixedDim: Color(0xfffdba74),
    onPrimaryFixedVariant: Color(0xff431407),
    secondaryFixed: Color(0xfff1f5f9),
    onSecondaryFixed: Color(0xff000000),
    secondaryFixedDim: Color(0xffcbd5e1),
    onSecondaryFixedVariant: Color(0xff0f172a),
    tertiaryFixed: Color(0xfffff7ed),
    onTertiaryFixed: Color(0xff000000),
    tertiaryFixedDim: Color(0xfffdba8c),
    onTertiaryFixedVariant: Color(0xff431407),
    surfaceDim: Color(0xff0c0a09),
    surfaceBright: Color(0xff44403c),
    surfaceContainerLowest: Color(0xff161412),
    surfaceContainerLow: Color(0xff1f1c1a),
    surfaceContainer: Color(0xff262220),
    surfaceContainerHigh: Color(0xff2c2826),
    surfaceContainerHighest: Color(0xff35302d),
  );
}

ThemeData _buildTheme(
  ColorScheme colorScheme,
  TextTheme textTheme,
  AppFontWeight fontWeight,
  CoporAccentPalette? accentPalette,
) {
  final isDark = colorScheme.brightness == Brightness.dark;
  final defaultColors = isDark ? const CoporColorScheme.dark() : const CoporColorScheme.light();
  final coporColors = accentPalette == null
      ? defaultColors
      : _withAccentPalette(accentPalette, colorScheme.brightness, colorScheme.primary);
  final effectiveColorScheme = accentPalette == null
      ? colorScheme
      : colorScheme.copyWith(
          primary: accentPalette.primary ?? colorScheme.primary,
          secondary: accentPalette.secondary,
          tertiary: accentPalette.tertiary,
          error: accentPalette.error,
        );
  return ThemeData(
    useMaterial3: true,
    brightness: effectiveColorScheme.brightness,
    colorScheme: effectiveColorScheme,
    textTheme: textTheme.apply(
      bodyColor: effectiveColorScheme.onSurface,
      displayColor: effectiveColorScheme.onSurface,
    ),
    scaffoldBackgroundColor: effectiveColorScheme.surface,
    canvasColor: effectiveColorScheme.surface,
    progressIndicatorTheme: ProgressIndicatorThemeData(color: coporColors.primary),
    scrollbarTheme: const ScrollbarThemeData(
      thumbVisibility: WidgetStatePropertyAll(true),
      interactive: true,
      thickness: WidgetStatePropertyAll(6),
    ),
    extensions: [
      coporColors,
      CoporThemeConfig(fontWeight: fontWeight, useAdaptiveAccentContrast: accentPalette != null),
      DTButtonThemeData.fromScheme(coporColors),
      DTInputThemeData.fromScheme(coporColors),
      DTSegmentedButtonThemeData.fromScheme(coporColors),
    ],
  );
}

CoporColorScheme _withAccentPalette(CoporAccentPalette palette, Brightness brightness, Color themePrimary) {
  final primary = _accentTokens(palette.primary ?? themePrimary, brightness);
  final secondary = _accentTokens(palette.secondary, brightness);
  final tertiary = _accentTokens(palette.tertiary, brightness);
  final success = _accentTokens(palette.success, brightness);
  final error = _accentTokens(palette.error, brightness);

  return brightness == Brightness.dark
      ? CoporColorScheme.dark(
          primary: primary.color,
          primaryContainer: primary.container,
          onPrimaryContainer: primary.onContainer,
          onPrimaryContainerSubtle: primary.onContainerSubtle,
          primaryBorder: primary.border,
          primaryHovered: primary.hovered,
          primaryPressed: primary.pressed,
          primaryDisabled: primary.disabled,
          secondary: secondary.color,
          secondaryContainer: secondary.container,
          onSecondaryContainer: secondary.onContainer,
          onSecondaryContainerSubtle: secondary.onContainerSubtle,
          secondaryBorder: secondary.border,
          secondaryHovered: secondary.hovered,
          secondaryPressed: secondary.pressed,
          secondaryDisabled: secondary.disabled,
          tertiary: tertiary.color,
          tertiaryContainer: tertiary.container,
          onTertiaryContainer: tertiary.onContainer,
          onTertiaryContainerSubtle: tertiary.onContainerSubtle,
          tertiaryBorder: tertiary.border,
          tertiaryHovered: tertiary.hovered,
          tertiaryPressed: tertiary.pressed,
          tertiaryDisabled: tertiary.disabled,
          success: success.color,
          successContainer: success.container,
          onSuccessContainer: success.onContainer,
          onSuccessContainerSubtle: success.onContainerSubtle,
          successBorder: success.border,
          successHovered: success.hovered,
          successPressed: success.pressed,
          successDisabled: success.disabled,
          error: error.color,
          errorContainer: error.container,
          onErrorContainer: error.onContainer,
          onErrorContainerSubtle: error.onContainerSubtle,
          errorBorder: error.border,
          errorHovered: error.hovered,
          errorPressed: error.pressed,
          errorDisabled: error.disabled,
        )
      : CoporColorScheme.light(
          primary: primary.color,
          primaryContainer: primary.container,
          onPrimaryContainer: primary.onContainer,
          onPrimaryContainerSubtle: primary.onContainerSubtle,
          primaryBorder: primary.border,
          primaryHovered: primary.hovered,
          primaryPressed: primary.pressed,
          primaryDisabled: primary.disabled,
          secondary: secondary.color,
          secondaryContainer: secondary.container,
          onSecondaryContainer: secondary.onContainer,
          onSecondaryContainerSubtle: secondary.onContainerSubtle,
          secondaryBorder: secondary.border,
          secondaryHovered: secondary.hovered,
          secondaryPressed: secondary.pressed,
          secondaryDisabled: secondary.disabled,
          tertiary: tertiary.color,
          tertiaryContainer: tertiary.container,
          onTertiaryContainer: tertiary.onContainer,
          onTertiaryContainerSubtle: tertiary.onContainerSubtle,
          tertiaryBorder: tertiary.border,
          tertiaryHovered: tertiary.hovered,
          tertiaryPressed: tertiary.pressed,
          tertiaryDisabled: tertiary.disabled,
          success: success.color,
          successContainer: success.container,
          onSuccessContainer: success.onContainer,
          onSuccessContainerSubtle: success.onContainerSubtle,
          successBorder: success.border,
          successHovered: success.hovered,
          successPressed: success.pressed,
          successDisabled: success.disabled,
          error: error.color,
          errorContainer: error.container,
          onErrorContainer: error.onContainer,
          onErrorContainerSubtle: error.onContainerSubtle,
          errorBorder: error.border,
          errorHovered: error.hovered,
          errorPressed: error.pressed,
          errorDisabled: error.disabled,
        );
}

({
  Color color,
  Color container,
  Color onContainer,
  Color onContainerSubtle,
  Color border,
  Color hovered,
  Color pressed,
  Color disabled,
})
_accentTokens(Color color, Brightness brightness) {
  final hsl = HSLColor.fromColor(color);
  final onContainer = brightness == Brightness.dark
      ? hsl.withLightness(hsl.lightness.clamp(0.68, 0.88)).toColor()
      : hsl.withLightness(hsl.lightness.clamp(0.22, 0.38)).toColor();

  return (
    color: color,
    container: color.withValues(alpha: brightness == Brightness.dark ? 0.14 : 0.09),
    onContainer: onContainer,
    onContainerSubtle: onContainer.withValues(alpha: 0.65),
    border: onContainer.withValues(alpha: 0.45),
    hovered: onContainer.withValues(alpha: 0.85),
    pressed: color.withValues(alpha: 0.30),
    disabled: color.withValues(alpha: 0.15),
  );
}

// ── CoporThemeBuilder ─────────────────────────────────────────────────────────

class CoporThemeBuilder {
  static AppTheme build({
    required ThemeMode themeMode,
    required ContrastMode contrastMode,
    required AppFontWeight fontWeight,
    required FontSize fontSize,
    CoporAccentPalette? accentPalette,
    String fontFamily = 'Inter',
    TextTheme? baseTextTheme,
  }) {
    final textTheme = _buildTextTheme(
      base: baseTextTheme ?? ThemeData().textTheme,
      fontFamily: fontFamily,
      scaleFactor: fontSizeToScale(fontSize),
      appFontWeight: fontWeight,
    );

    return AppTheme(
      themeMode: themeMode,
      lightTheme: contrastMode == ContrastMode.high
          ? _buildTheme(_lightHighContrastScheme(), textTheme, fontWeight, accentPalette)
          : _buildTheme(_lightNormalContrastScheme(), textTheme, fontWeight, accentPalette),
      darkTheme: contrastMode == ContrastMode.high
          ? _buildTheme(_darkHighContrastScheme(), textTheme, fontWeight, accentPalette)
          : _buildTheme(_darkNormalContrastScheme(), textTheme, fontWeight, accentPalette),
    );
  }

  static TextTheme _buildTextTheme({
    required TextTheme base,
    required String fontFamily,
    required double scaleFactor,
    required AppFontWeight appFontWeight,
  }) {
    final withFont = base.apply(fontFamily: fontFamily);
    final weighted = _applyFontWeight(withFont, appFontWeight);
    return _scaleTextTheme(weighted, scaleFactor);
  }

  static TextTheme _scaleTextTheme(TextTheme theme, double scale) {
    TextStyle? s(TextStyle? t) =>
        t == null || t.fontSize == null ? t : t.copyWith(fontSize: t.fontSize! * scale);

    return theme.copyWith(
      displayLarge: s(theme.displayLarge),
      displayMedium: s(theme.displayMedium),
      displaySmall: s(theme.displaySmall),
      headlineLarge: s(theme.headlineLarge),
      headlineMedium: s(theme.headlineMedium),
      headlineSmall: s(theme.headlineSmall),
      titleLarge: s(theme.titleLarge),
      titleMedium: s(theme.titleMedium),
      titleSmall: s(theme.titleSmall),
      bodyLarge: s(theme.bodyLarge),
      bodyMedium: s(theme.bodyMedium),
      bodySmall: s(theme.bodySmall),
      labelLarge: s(theme.labelLarge),
      labelMedium: s(theme.labelMedium),
      labelSmall: s(theme.labelSmall),
    );
  }

  static TextTheme _applyFontWeight(TextTheme theme, AppFontWeight appFontWeight) {
    switch (appFontWeight) {
      case AppFontWeight.normal:
        return theme;

      case AppFontWeight.light:
        return theme.copyWith(
          bodyLarge: theme.bodyLarge?.copyWith(fontWeight: FontWeight.w300),
          bodyMedium: theme.bodyMedium?.copyWith(fontWeight: FontWeight.w300),
          bodySmall: theme.bodySmall?.copyWith(fontWeight: FontWeight.w300),
          labelLarge: theme.labelLarge?.copyWith(fontWeight: FontWeight.w400),
          labelMedium: theme.labelMedium?.copyWith(fontWeight: FontWeight.w400),
          labelSmall: theme.labelSmall?.copyWith(fontWeight: FontWeight.w400),
          titleLarge: theme.titleLarge?.copyWith(fontWeight: FontWeight.w300),
          titleMedium: theme.titleMedium?.copyWith(fontWeight: FontWeight.w400),
          titleSmall: theme.titleSmall?.copyWith(fontWeight: FontWeight.w400),
          displayLarge: theme.displayLarge?.copyWith(fontWeight: FontWeight.w300),
          displayMedium: theme.displayMedium?.copyWith(fontWeight: FontWeight.w300),
          displaySmall: theme.displaySmall?.copyWith(fontWeight: FontWeight.w300),
          headlineLarge: theme.headlineLarge?.copyWith(fontWeight: FontWeight.w300),
          headlineMedium: theme.headlineMedium?.copyWith(fontWeight: FontWeight.w300),
          headlineSmall: theme.headlineSmall?.copyWith(fontWeight: FontWeight.w300),
        );

      case AppFontWeight.bold:
        return theme.copyWith(
          bodyLarge: theme.bodyLarge?.copyWith(fontWeight: FontWeight.w500),
          bodyMedium: theme.bodyMedium?.copyWith(fontWeight: FontWeight.w500),
          bodySmall: theme.bodySmall?.copyWith(fontWeight: FontWeight.w500),
          labelLarge: theme.labelLarge?.copyWith(fontWeight: FontWeight.w600),
          labelMedium: theme.labelMedium?.copyWith(fontWeight: FontWeight.w600),
          labelSmall: theme.labelSmall?.copyWith(fontWeight: FontWeight.w600),
          titleLarge: theme.titleLarge?.copyWith(fontWeight: FontWeight.w500),
          titleMedium: theme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
          titleSmall: theme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
          displayLarge: theme.displayLarge?.copyWith(fontWeight: FontWeight.w500),
          displayMedium: theme.displayMedium?.copyWith(fontWeight: FontWeight.w500),
          displaySmall: theme.displaySmall?.copyWith(fontWeight: FontWeight.w500),
          headlineLarge: theme.headlineLarge?.copyWith(fontWeight: FontWeight.w500),
          headlineMedium: theme.headlineMedium?.copyWith(fontWeight: FontWeight.w500),
          headlineSmall: theme.headlineSmall?.copyWith(fontWeight: FontWeight.w500),
        );
    }
  }
}
