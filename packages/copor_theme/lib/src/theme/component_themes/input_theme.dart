import 'dart:ui';

import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

@immutable
class DTInputThemeData extends ThemeExtension<DTInputThemeData> {
  final double borderRadius;
  final EdgeInsetsGeometry contentPadding;

  // ── Border colors ──
  final Color enabledBorder;
  final Color hoveredBorder;
  final Color disabledBorder;
  final Color focusedBorder;
  final Color errorBorder;

  // ── Label colors ──
  final Color labelColor;
  final Color focusedLabelColor;
  final Color errorLabelColor;
  final Color floatingLabelColor;
  final Color hintLabelColor;

  // ── Error text ──
  final TextStyle errorStyle;

  const DTInputThemeData({
    required this.borderRadius,
    required this.contentPadding,
    required this.enabledBorder,
    required this.hoveredBorder,
    required this.disabledBorder,
    required this.focusedBorder,
    required this.errorBorder,
    required this.labelColor,
    required this.focusedLabelColor,
    required this.hintLabelColor,
    required this.errorLabelColor,
    required this.floatingLabelColor,
    required this.errorStyle,
  });

  factory DTInputThemeData.fromScheme(CoporColorScheme s) {
    return DTInputThemeData(
      borderRadius: coporBorderRadius,
      contentPadding: kInputContentPadding,
      enabledBorder: s.outline!,
      hoveredBorder: s.primaryBorder!,
      disabledBorder: s.outlineSubtle!,
      focusedBorder: s.primaryBorder!,
      errorBorder: s.errorBorder!,
      labelColor: s.onSurface!,
      hintLabelColor: s.onSurfaceSubtle!,
      focusedLabelColor: s.onPrimaryContainer!,
      errorLabelColor: s.onErrorContainer!,
      floatingLabelColor: s.onSurfaceSubtle!,
      errorStyle: TextStyle(color: s.onErrorContainer!, fontSize: 12),
    );
  }

  static DTInputThemeData of(BuildContext context) =>
      Theme.of(context).extension<DTInputThemeData>()!;

  InputDecoration buildDecoration({
    required String label,
    Widget? prefixIcon,
    Widget? suffixIcon,
    EdgeInsetsGeometry? contentPadding,
    String? hintText,
    bool isHovered = false,
    bool isError = false,
  }) {
    final r = BorderRadius.circular(borderRadius);
    return InputDecoration(
      labelText: label,
      floatingLabelBehavior: FloatingLabelBehavior.always,
      hintText: hintText,
      contentPadding: contentPadding ?? this.contentPadding,
      prefixIcon: prefixIcon,
      suffixIcon: suffixIcon,
      errorStyle: errorStyle,
      suffixIconColor: WidgetStateColor.resolveWith((states) {
        if (isError || states.contains(WidgetState.error)) return errorLabelColor;
        if (states.contains(WidgetState.focused)) return focusedLabelColor;
        return labelColor;
      }),
      border: OutlineInputBorder(borderRadius: r),
      enabledBorder: OutlineInputBorder(borderRadius: r, borderSide: BorderSide(width: 1.5, color: isError ? errorBorder : (isHovered ? hoveredBorder : enabledBorder))),
      disabledBorder: OutlineInputBorder(borderRadius: r, borderSide: BorderSide(color: disabledBorder)),
      focusedBorder: OutlineInputBorder(borderRadius: r, borderSide: BorderSide(width: 1.5, color: isError ? errorBorder : focusedBorder)),
      errorBorder: OutlineInputBorder(borderRadius: r, borderSide: BorderSide(width: 1.5, color: errorBorder)),
      focusedErrorBorder: OutlineInputBorder(borderRadius: r, borderSide: BorderSide(width: 1.5, color: errorBorder)),
      hintStyle: WidgetStateTextStyle.resolveWith((states) {
        if (isError || states.contains(WidgetState.error)) return TextStyle(color: hintLabelColor);
        if (states.contains(WidgetState.focused)) return TextStyle(color: hintLabelColor);
        return TextStyle(color: hintLabelColor);
      }),
      labelStyle: WidgetStateTextStyle.resolveWith((states) {
        if (isError || states.contains(WidgetState.error)) return TextStyle(color: errorLabelColor);
        if (states.contains(WidgetState.focused)) return TextStyle(color: focusedLabelColor);
        return TextStyle(color: labelColor);
      }),
      floatingLabelStyle: WidgetStateTextStyle.resolveWith((states) {
        if (isError || states.contains(WidgetState.error)) return TextStyle(color: errorLabelColor);
        if (states.contains(WidgetState.focused)) return TextStyle(color: focusedLabelColor);
        return TextStyle(color: floatingLabelColor);
      }),
    );
  }

  @override
  DTInputThemeData copyWith({
    double? borderRadius,
    EdgeInsetsGeometry? contentPadding,
    Color? enabledBorder,
    Color? hoveredBorder,
    Color? disabledBorder,
    Color? focusedBorder,
    Color? errorBorder,
    Color? labelColor,
    Color? hintLabelColor,
    Color? focusedLabelColor,
    Color? errorLabelColor,
    Color? floatingLabelColor,
    TextStyle? errorStyle,
  }) {
    return DTInputThemeData(
      borderRadius: borderRadius ?? this.borderRadius,
      contentPadding: contentPadding ?? this.contentPadding,
      enabledBorder: enabledBorder ?? this.enabledBorder,
      hoveredBorder: hoveredBorder ?? this.hoveredBorder,
      disabledBorder: disabledBorder ?? this.disabledBorder,
      focusedBorder: focusedBorder ?? this.focusedBorder,
      errorBorder: errorBorder ?? this.errorBorder,
      labelColor: labelColor ?? this.labelColor,
      hintLabelColor: hintLabelColor ?? this.hintLabelColor,
      focusedLabelColor: focusedLabelColor ?? this.focusedLabelColor,
      errorLabelColor: errorLabelColor ?? this.errorLabelColor,
      floatingLabelColor: floatingLabelColor ?? this.floatingLabelColor,
      errorStyle: errorStyle ?? this.errorStyle,
    );
  }

  @override
  DTInputThemeData lerp(ThemeExtension<DTInputThemeData>? other, double t) {
    if (other is! DTInputThemeData) return this;
    return DTInputThemeData(
      borderRadius: lerpDouble(borderRadius, other.borderRadius, t)!,
      contentPadding: EdgeInsetsGeometry.lerp(contentPadding, other.contentPadding, t)!,
      enabledBorder: Color.lerp(enabledBorder, other.enabledBorder, t)!,
      hoveredBorder: Color.lerp(hoveredBorder, other.hoveredBorder, t)!,
      disabledBorder: Color.lerp(disabledBorder, other.disabledBorder, t)!,
      focusedBorder: Color.lerp(focusedBorder, other.focusedBorder, t)!,
      errorBorder: Color.lerp(errorBorder, other.errorBorder, t)!,
      labelColor: Color.lerp(labelColor, other.labelColor, t)!,
      hintLabelColor: Color.lerp(hintLabelColor, other.hintLabelColor, t)!,
      focusedLabelColor: Color.lerp(focusedLabelColor, other.focusedLabelColor, t)!,
      errorLabelColor: Color.lerp(errorLabelColor, other.errorLabelColor, t)!,
      floatingLabelColor: Color.lerp(floatingLabelColor, other.floatingLabelColor, t)!,
      errorStyle: TextStyle.lerp(errorStyle, other.errorStyle, t)!,
    );
  }
}
