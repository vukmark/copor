import 'package:copor_theme/src/theme/component_themes/button_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:flutter/material.dart';

const _kLabelIconSize = 16.0;
const _kIconLabelSpacing = 8.0;
const _kBorderRadius = coporBorderRadius;

TextStyle _kButtonStyle(BuildContext context) =>
    CoporTheme.of(context).text.buttonLabel;

/// Sizing tier for square icon buttons.
///
/// | Tier      | Container | Default icon |
/// |-----------|-----------|--------------|
/// | normal    | 40 px     | 20 px        |
/// | compact   | 35 px     | 18 px        |
/// | small     | 30 px     | 16 px        |
/// | xs        | 25 px     | 14 px        |
enum DTInputSize { xl, normal, compact, small, xs }

extension DTInputSizeX on DTInputSize {
  double get containerSize => switch (this) {
    DTInputSize.xl => coporInputXLarge,
    DTInputSize.normal => coporInputLarge,
    DTInputSize.compact => coporInputMedium,
    DTInputSize.small => coporInputSmall,
    DTInputSize.xs => coporInputExtraSmall,
  };

  double get defaultIconSize => switch (this) {
    DTInputSize.xl => 24,
    DTInputSize.normal => 20,
    DTInputSize.compact => 18,
    DTInputSize.small => 16,
    DTInputSize.xs => 14,
  };
}

enum _DTButtonVariant {
  primary,
  secondary,
  tertiary,
  positive,
  surface,
  negative,
  floating,
  toggle,
}

/// A compact button for toolbars, navigation, and table rows.
///
/// - [DTButton.primary]    — primary action (primaryContainer fill)
/// - [DTButton.secondary]  — secondary action
/// - [DTButton.tertiary]   — tertiary action
/// - [DTButton.positive]   — confirm/positive action
/// - [DTButton.surface]    — neutral surface action
/// - [DTButton.negative]   — destructive action
/// - [DTButton.floating]   — label button floating over content (surface fill + shadow)
/// - [DTButton.toggle]     — icon button that lights up when active
///
/// Label variants (primary … floating) **auto-square** when [label] is empty
/// and [icon] is provided — no separate icon-only constructor needed.
///
/// For pre-configured common actions (edit, delete, copy, info) use
/// [DTCommonButtons].
class DTButton extends StatelessWidget {
  final IconData? icon;
  final IconData? iconToggled;
  final Widget? animatedIcon;
  final String label;
  final String? labelToggled;
  final VoidCallback onPressed;
  final bool enabled;
  final bool centered;
  final bool fullWidth;
  final bool circular;
  final double? size;
  final String? semanticLabel;
  final EdgeInsetsGeometry? iconPadding;
  final bool isToggled;
  final bool highlightToggled;
  final bool reverseContent;
  final bool border;
  final Color? borderColor;
  // Only meaningful on [DTButton.toggle]: renders the icon-only button using
  // the same secondaryContainer/onSecondaryContainer/secondaryBorder tokens
  // DTBanner.warning uses, instead of the default toggle style. Lets a
  // toggle button (e.g. an expand/collapse control) flag a problem without
  // losing its toggle behavior.
  final bool warning;
  final _DTButtonVariant _variant;
  final DTInputSize _inputSize;

  const DTButton.primary({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    DTInputSize inputSize = DTInputSize.normal,
  }) : _variant = _DTButtonVariant.primary,
       _inputSize = inputSize,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  const DTButton.secondary({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    DTInputSize inputSize = DTInputSize.normal,
  }) : _variant = _DTButtonVariant.secondary,
       _inputSize = inputSize,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  const DTButton.tertiary({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    DTInputSize inputSize = DTInputSize.normal,
  }) : _variant = _DTButtonVariant.tertiary,
       _inputSize = inputSize,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  const DTButton.positive({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    DTInputSize inputSize = DTInputSize.normal,
  }) : _variant = _DTButtonVariant.positive,
       _inputSize = inputSize,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  const DTButton.surface({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    DTInputSize inputSize = DTInputSize.normal,
  }) : _variant = _DTButtonVariant.surface,
       _inputSize = inputSize,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  const DTButton.negative({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    DTInputSize inputSize = DTInputSize.normal,
  }) : _variant = _DTButtonVariant.negative,
       _inputSize = inputSize,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  const DTButton.floating({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = false,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
  }) : _variant = _DTButtonVariant.floating,
       _inputSize = DTInputSize.normal,
       iconPadding = null,
       animatedIcon = null,
       iconToggled = null,
       labelToggled = null,
       isToggled = false,
       highlightToggled = false,
       borderColor = null,
       warning = false;

  /// Toggle button. Icon-only when [label] is empty; label/label+icon otherwise.
  /// Pass [animatedIcon] (e.g. DTAnimatedChevron) to replace the static icon.
  /// Pass [labelToggled] to show a different label when active.
  /// Pass [warning] (icon-only only) to flag a problem via the same colors
  /// DTBanner.warning uses, independent of [isToggled].
  const DTButton.toggle({
    super.key,
    this.icon,
    this.iconToggled,
    this.animatedIcon,
    this.semanticLabel,
    required this.onPressed,
    required this.isToggled,
    this.highlightToggled = true,
    this.enabled = true,
    this.fullWidth = false,
    this.label = '',
    this.labelToggled,
    this.reverseContent = false,
    this.border = true,
    this.borderColor,
    this.warning = false,
    DTInputSize inputSize = DTInputSize.normal,
    this.size,
    this.iconPadding,
  }) : _variant = _DTButtonVariant.toggle,
       _inputSize = inputSize,
       circular = false,
       centered = false;

  // ── Build ──────────────────────────────────────────────────────────────────

  String get _resolvedSemanticLabel {
    final explicit = semanticLabel?.trim();
    if (explicit != null && explicit.isNotEmpty) return explicit;
    if (label.isNotEmpty) return label;
    return 'Button';
  }

  @override
  Widget build(BuildContext context) {
    final theme = DTButtonThemeData.of(context);
    final dt = CoporTheme.of(context);

    final child = switch (_variant) {
      _DTButtonVariant.primary ||
      _DTButtonVariant.secondary ||
      _DTButtonVariant.tertiary ||
      _DTButtonVariant.positive ||
      _DTButtonVariant.surface ||
      _DTButtonVariant.negative ||
      _DTButtonVariant.floating => _buildLabel(theme, dt, context),
      _DTButtonVariant.toggle => _buildToggle(theme, context),
    };

    final wrapped = _variant == _DTButtonVariant.floating
        ? DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(_kBorderRadius),
              boxShadow: border ? coporDropShadow(context) : null,
            ),
            child: child,
          )
        : child;

    return Semantics(
      label: _resolvedSemanticLabel,
      button: true,
      child: wrapped,
    );
  }

  bool get _isAutoSquare => label.isEmpty && icon != null;

  Widget _buildLabel(
    DTButtonThemeData theme,
    CoporTheme dt,
    BuildContext context,
  ) {
    final baseStyle = switch (_variant) {
      _DTButtonVariant.primary => theme.primary,
      _DTButtonVariant.secondary => theme.secondary,
      _DTButtonVariant.tertiary => theme.tertiary,
      _DTButtonVariant.positive => theme.positive,
      _DTButtonVariant.negative => theme.negative,
      _DTButtonVariant.floating => theme.floating,
      _ => theme.surface,
    };

    final noBorderSide = border
        ? null
        : WidgetStateProperty.all(BorderSide.none);
    final noBorderBg = border
        ? null
        : WidgetStateProperty.all(Colors.transparent);

    if (_isAutoSquare) {
      final d = _inputSize.containerSize;
      // Borderless icon-only buttons always get a circular hover/splash —
      // switching shape between rounded-rect (idle) and circle (hovered)
      // used to animate via `Material`'s implicit `ShapeBorderTween`, but
      // there's no real interpolation between two different `OutlinedBorder`
      // geometries: Flutter just snaps from one to the other at the
      // animation's halfway point. That snap landed while the hover overlay
      // was still visible on the way out (fading in masked it on the way
      // in), which looked like the circle "morphing" into a rounded square.
      // Keeping the shape constant sidesteps the mismatch entirely.
      final circleShape = WidgetStateProperty.all<OutlinedBorder>(
        const CircleBorder(),
      );
      final squareStyle = baseStyle.copyWith(
        padding: WidgetStateProperty.all(EdgeInsets.zero),
        fixedSize: WidgetStateProperty.all(Size(d, d)),
        side: noBorderSide,
        backgroundColor: noBorderBg,
        shape: (circular || !border) ? circleShape : null,
        iconColor: baseStyle.foregroundColor,
      );
      return SizedBox(
        width: d,
        height: d,
        child: OutlinedButton(
          style: squareStyle,
          onPressed: enabled ? onPressed : null,
          child: Icon(icon, size: size ?? _inputSize.defaultIconSize),
        ),
      );
    }

    // final noBorderShape = border
    //     ? null
    //     : WidgetStateProperty.resolveWith<OutlinedBorder>((states) {
    //         if (states.contains(WidgetState.hovered) || states.contains(WidgetState.pressed)) {
    //           return const StadiumBorder();
    //         }
    //         return const RoundedRectangleBorder(
    //           borderRadius: BorderRadius.all(Radius.circular(_kBorderRadius)),
    //         );
    //       });

    final style = baseStyle.copyWith(
      textStyle: WidgetStateProperty.all(_kButtonStyle(context)),
      side: noBorderSide,
      backgroundColor: noBorderBg,
      shape: null,
    );
    final expand = fullWidth || centered;
    return SizedBox(
      width: fullWidth ? double.infinity : null,
      height: coporInputLarge,
      child: OutlinedButton(
        style: style,
        onPressed: enabled ? onPressed : null,
        child: Row(
          mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
          mainAxisAlignment: expand
              ? MainAxisAlignment.center
              : MainAxisAlignment.start,
          children: reverseContent
              ? [
                  Text(label),
                  if (icon != null) const SizedBox(width: _kIconLabelSpacing),
                  if (icon != null) Icon(icon, size: size ?? _kLabelIconSize),
                ]
              : [
                  if (icon != null) Icon(icon, size: size ?? _kLabelIconSize),
                  if (icon != null) const SizedBox(width: _kIconLabelSpacing),
                  Text(label),
                ],
        ),
      ),
    );
  }

  Widget _buildToggle(DTButtonThemeData theme, BuildContext context) {
    final effectiveLabel = (isToggled ? labelToggled : null) ?? label;
    final hasLabel = effectiveLabel.isNotEmpty;
    final effectiveIcon = (isToggled ? iconToggled : null) ?? icon;
    final iconWidget =
        animatedIcon ??
        (effectiveIcon != null
            ? Icon(effectiveIcon, size: size ?? _inputSize.defaultIconSize)
            : null);
    final isIconOnly = !hasLabel && iconWidget != null;

    if (isIconOnly) {
      // Recolor theme.toggle rather than swapping in theme.secondary
      // wholesale: secondary carries label-button padding/minimumSize
      // (coporInputHorizontalPadding-based) that isn't centered for a
      // fixed-size icon-only square button.
      final colors = CoporTheme.of(context).colors;
      final baseToggleStyle = !warning
          ? theme.toggle
          : theme.toggle.copyWith(
              backgroundColor: WidgetStateProperty.all(
                colors.secondaryContainer,
              ),
              foregroundColor: WidgetStateProperty.all(
                colors.onSecondaryContainer,
              ),
              iconColor: WidgetStateProperty.all(colors.onSecondaryContainer),
              side: WidgetStateProperty.all(
                BorderSide(color: colors.secondaryBorder),
              ),
            );
      var resolvedStyle = iconPadding != null
          ? baseToggleStyle.copyWith(
              padding: WidgetStateProperty.all(iconPadding),
            )
          : baseToggleStyle;
      if (borderColor != null) {
        resolvedStyle = resolvedStyle.copyWith(
          side: WidgetStateProperty.all(BorderSide(color: borderColor!)),
        );
      }
      final d = _inputSize.containerSize;
      final iconButton = IconButton(
        style: resolvedStyle,
        isSelected: highlightToggled && isToggled,
        onPressed: enabled ? onPressed : null,
        icon: iconWidget,
      );
      return SizedBox(
        width: d,
        height: d,
        child: border
            ? Container(
                decoration: BoxDecoration(
                  color: CoporTheme.of(context).colors.surface,
                  borderRadius: BorderRadius.circular(coporBorderRadius),
                ),
                child: iconButton,
              )
            : iconButton,
      );
    }

    final noBorderSide = border
        ? null
        : WidgetStateProperty.all(BorderSide.none);
    final noBorderBg = border
        ? null
        : WidgetStateProperty.all(Colors.transparent);
    final labelIconWidget =
        animatedIcon ??
        (effectiveIcon != null
            ? Icon(effectiveIcon, size: size ?? _kLabelIconSize)
            : null);
    final baseStyle = theme.surface;
    final labelStyle = baseStyle.copyWith(
      textStyle: WidgetStateProperty.all(_kButtonStyle(context)),
      side: noBorderSide,
      backgroundColor: noBorderBg,
    );
    final h = _inputSize.containerSize;
    return SizedBox(
      width: fullWidth ? double.infinity : null,
      height: h,
      child: OutlinedButton(
        style: labelStyle,
        onPressed: enabled ? onPressed : null,
        child: Row(
          mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: reverseContent
              ? [
                  if (hasLabel) Text(effectiveLabel),
                  if (labelIconWidget != null) ...[
                    const SizedBox(width: _kIconLabelSpacing),
                    labelIconWidget,
                  ],
                ]
              : [
                  if (labelIconWidget != null) ...[
                    labelIconWidget,
                    const SizedBox(width: _kIconLabelSpacing),
                  ],
                  if (hasLabel) Text(effectiveLabel),
                ],
        ),
      ),
    );
  }
}
