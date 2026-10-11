import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

@immutable
class DTButtonThemeData extends ThemeExtension<DTButtonThemeData> {
  final ButtonStyle surface;
  final ButtonStyle primary;
  final ButtonStyle secondary;
  final ButtonStyle tertiary;
  final ButtonStyle positive;
  final ButtonStyle negative;
  final ButtonStyle floating;
  final ButtonStyle toggle;

  const DTButtonThemeData({
    required this.surface,
    required this.primary,
    required this.secondary,
    required this.tertiary,
    required this.positive,
    required this.negative,
    required this.floating,
    required this.toggle,
  });

  factory DTButtonThemeData.fromScheme(CoporColorScheme s) {
    const shape = RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(coporBorderRadius)),
    );

    ButtonStyle base({
      required Color containerColor,
      required Color labelColor,
      required Color iconColor,
      required Color borderColor,
      required Color pressedColor,
      required Color hoveredColor,
      required Color disabledBorderColor,
      Color? disabledContainerColor,
      Color? disabledLabelColor,
      Color? disabledIconColor,
      double height = coporInputLarge,
      EdgeInsetsGeometry horizontalPadding = coporInputHorizontalPadding,
    }) {
      return ButtonStyle(
        backgroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) return disabledContainerColor ?? Colors.transparent;
          return containerColor;
        }),
        foregroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) return disabledLabelColor ?? s.onSurfaceDisabled;
          return labelColor;
        }),
        iconColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) return disabledIconColor ?? s.onSurfaceDisabled;
          return iconColor;
        }),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) return Colors.transparent;
          if (states.contains(WidgetState.pressed)) return pressedColor;
          if (states.contains(WidgetState.hovered)) return hoveredColor;
          return Colors.transparent;
        }),
        side: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) return BorderSide(color: disabledBorderColor);
          return BorderSide(color: borderColor);
        }),
        shape: WidgetStateProperty.all(shape),
        padding: WidgetStateProperty.all(horizontalPadding),
        minimumSize: WidgetStateProperty.all(Size(0, height)),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        elevation: WidgetStateProperty.all(0),
      );
    }

    return DTButtonThemeData(
      surface: base(containerColor: s.surfaceContainer!, labelColor: s.onSurface!, iconColor: s.onSurfaceSubtle!, borderColor: s.outline!, hoveredColor: s.surfaceHovered!, pressedColor: s.surfacePressed!, disabledBorderColor: s.outlineDisabled!),
      primary: base(containerColor: s.primaryContainer!, labelColor: s.onPrimaryContainer!, iconColor: s.onPrimaryContainerSubtle!, borderColor: s.primaryBorder!, hoveredColor: s.primaryHovered!, pressedColor: s.primaryPressed!, disabledBorderColor: s.primaryDisabled!, disabledContainerColor: s.primaryContainer!, disabledLabelColor: s.primaryDisabled!, disabledIconColor: s.primaryDisabled!),
      secondary: base(containerColor: s.secondaryContainer!, labelColor: s.onSecondaryContainer!, iconColor: s.onSecondaryContainerSubtle!, borderColor: s.secondaryBorder!, hoveredColor: s.secondaryHovered!, pressedColor: s.secondaryPressed!, disabledBorderColor: s.secondaryDisabled!, disabledContainerColor: s.secondaryContainer!, disabledLabelColor: s.secondaryDisabled!, disabledIconColor: s.secondaryDisabled!),
      tertiary: base(containerColor: s.tertiaryContainer!, labelColor: s.onTertiaryContainer!, iconColor: s.onTertiaryContainerSubtle!, borderColor: s.tertiaryBorder!, hoveredColor: s.tertiaryHovered!, pressedColor: s.tertiaryPressed!, disabledBorderColor: s.tertiaryDisabled!, disabledContainerColor: s.tertiaryContainer!, disabledLabelColor: s.tertiaryDisabled!, disabledIconColor: s.tertiaryDisabled!),
      positive: base(containerColor: s.successContainer!, labelColor: s.onSuccessContainer!, iconColor: s.onSuccessContainerSubtle!, borderColor: s.successBorder!, hoveredColor: s.successHovered!, pressedColor: s.successPressed!, disabledBorderColor: s.successDisabled!, disabledContainerColor: s.successContainer!, disabledLabelColor: s.successDisabled!, disabledIconColor: s.successDisabled!),
      negative: base(containerColor: s.errorContainer!, labelColor: s.onErrorContainer!, iconColor: s.onErrorContainerSubtle!, borderColor: s.errorBorder!, hoveredColor: s.errorHovered!, pressedColor: s.errorPressed!, disabledBorderColor: s.errorDisabled!, disabledContainerColor: s.errorContainer!, disabledLabelColor: s.errorDisabled!, disabledIconColor: s.errorDisabled!),
      floating: base(containerColor: s.surface!, labelColor: s.onSurface!, iconColor: s.onSurfaceSubtle!, borderColor: s.outlineSubtle!, hoveredColor: s.surfaceHovered!, pressedColor: s.surfacePressed!, disabledBorderColor: s.outlineDisabled!),
      toggle: ButtonStyle(
        backgroundColor: WidgetStateProperty.resolveWith((states) =>
        states.contains(WidgetState.selected) ? s.primaryContainer! : s.surface!),
        foregroundColor: WidgetStateProperty.resolveWith((states) =>
        states.contains(WidgetState.selected) ? s.onPrimaryContainer! : s.onSurface!),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          if (states.contains(WidgetState.pressed)) return selected ? s.primaryPressed : s.surfacePressed;
          if (states.contains(WidgetState.hovered)) return selected ? s.primaryHovered : s.surfaceHovered;
          if (states.contains(WidgetState.focused)) return Colors.transparent;
          return Colors.transparent;
        }),
        side: WidgetStateProperty.resolveWith((states) => BorderSide(
          color: states.contains(WidgetState.selected) ? s.primaryBorder! : s.outlineSubtle!,
        )),
        shape: WidgetStateProperty.all(shape),
        padding: WidgetStateProperty.all(EdgeInsets.zero),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        elevation: WidgetStateProperty.all(0),
      ),
    );
  }

  static DTButtonThemeData of(BuildContext context) =>
      Theme.of(context).extension<DTButtonThemeData>()!;

  @override
  DTButtonThemeData copyWith({
    ButtonStyle? surface,
    ButtonStyle? primary,
    ButtonStyle? secondary,
    ButtonStyle? tertiary,
    ButtonStyle? positive,
    ButtonStyle? negative,
    ButtonStyle? floating,
    ButtonStyle? toggle,
  }) {
    return DTButtonThemeData(
      surface: surface ?? this.surface,
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      tertiary: tertiary ?? this.tertiary,
      positive: positive ?? this.positive,
      negative: negative ?? this.negative,
      floating: floating ?? this.floating,
      toggle: toggle ?? this.toggle,
    );
  }

  @override
  DTButtonThemeData lerp(ThemeExtension<DTButtonThemeData>? other, double t) {
    if (other is! DTButtonThemeData) return this;
    return DTButtonThemeData(
      surface: ButtonStyle.lerp(surface, other.surface, t)!,
      primary: ButtonStyle.lerp(primary, other.primary, t)!,
      secondary: ButtonStyle.lerp(secondary, other.secondary, t)!,
      tertiary: ButtonStyle.lerp(tertiary, other.tertiary, t)!,
      positive: ButtonStyle.lerp(positive, other.positive, t)!,
      negative: ButtonStyle.lerp(negative, other.negative, t)!,
      floating: ButtonStyle.lerp(floating, other.floating, t)!,
      toggle: ButtonStyle.lerp(toggle, other.toggle, t)!,
    );
  }
}
