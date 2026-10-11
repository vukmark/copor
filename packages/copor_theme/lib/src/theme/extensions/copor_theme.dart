import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:flutter/material.dart';

/// Unified DT design-system accessor.
///
/// Combines [CoporColors] and [CoporTextStyles] under one call so widgets
/// can access both tokens without declaring two local variables.
///
/// ```dart
/// final dt = CoporTheme.of(context);
/// color: dt.colors.primary
/// style: dt.text.sectionTitle
/// ```
class CoporTheme {
  final CoporColors colors;
  final CoporTextStyles text;

  CoporTheme.of(BuildContext context)
      : colors = CoporColors.of(context),
        text = CoporTextStyles.of(context);
}
