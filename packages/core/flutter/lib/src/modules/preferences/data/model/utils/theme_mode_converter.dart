import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

/// Theme Mode Converter is used for defining JsonValue of
/// ThemeMode enum, but since ThemeMode is in app.dart,
/// Flutter's own file, we can't add it's @JsonValue and we
/// need to convert them manually

class ThemeModeConverter implements JsonConverter<ThemeMode, int> {
  const ThemeModeConverter();

  @override
  ThemeMode fromJson(int json) {
    switch (json) {
      case 0:
        return ThemeMode.system;
      case 1:
        return ThemeMode.light;
      case 2:
        return ThemeMode.dark;
      default:
        return ThemeMode.system;
    }
  }

  @override
  int toJson(ThemeMode object) {
    switch (object) {
      case ThemeMode.system:
        return 0;
      case ThemeMode.light:
        return 1;
      case ThemeMode.dark:
        return 2;
    }
  }
}
