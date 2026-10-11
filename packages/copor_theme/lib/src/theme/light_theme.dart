import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/component_themes/button_theme.dart';
import 'package:copor_theme/src/theme/component_themes/input_theme.dart';
import 'package:copor_theme/src/theme/component_themes/segmented_button_theme.dart';
import 'package:flutter/material.dart';

const _colors = CoporColorScheme.light();
final _buttonTheme = DTButtonThemeData.fromScheme(_colors);
final _inputTheme = DTInputThemeData.fromScheme(_colors);
final _segmentedButtonTheme = DTSegmentedButtonThemeData.fromScheme(_colors);

final ThemeData lightTheme = ThemeData(
  appBarTheme: AppBarTheme(
    backgroundColor: _colors.surface,
    surfaceTintColor: Colors.transparent,
    elevation: 0,
  ),
  progressIndicatorTheme: ProgressIndicatorThemeData(
    color: _colors.onPrimaryContainer,
  ),
  fontFamily: 'Inter',
  useMaterial3: true,
  colorSchemeSeed: _colors.onPrimaryContainer,
  extensions: <ThemeExtension<dynamic>>[_colors, _buttonTheme, _inputTheme, _segmentedButtonTheme],
);
