import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:flutter/material.dart';

const _kPaddingH = 8.0;
const _kPaddingV = 5.0;
const _kIconSize = 13.0;
const _kBorderRadius = 20.0;
const _kSpacing = 7.0;

const _kLargePaddingH = 12.0;
const _kLargePaddingV = 9.0;
const _kLargeIconSize = 16.0;
const _kLargeSpacing = 9.0;

TextStyle _kLabelStyle(BuildContext context, Color color, {required bool large}) {
  final text = CoporTheme.of(context).text;
  return (large ? text.labelDefault : text.chipLabel).copyWith(color: color);
}

enum _DTInfoChipVariant { surface, primary, secondary, tertiary, success, error }

class DTInfoChip extends StatelessWidget {
  final IconData? icon;
  final String label;

  /// Fills the width offered by the parent instead of hugging the label —
  /// for chips laid out in equal-width columns. The label ellipsizes either
  /// way once the available width runs out.
  final bool expand;

  /// Roomier padding, icon and label — for chips that carry a row of their own
  /// rather than trailing a line of text.
  final bool large;

  final _DTInfoChipVariant _variant;

  const DTInfoChip.surface({
    super.key,
    this.icon,
    required this.label,
    this.expand = false,
    this.large = false,
  }) : _variant = _DTInfoChipVariant.surface;

  const DTInfoChip.primary({
    super.key,
    this.icon,
    required this.label,
    this.expand = false,
    this.large = false,
  }) : _variant = _DTInfoChipVariant.primary;

  const DTInfoChip.secondary({
    super.key,
    this.icon,
    required this.label,
    this.expand = false,
    this.large = false,
  }) : _variant = _DTInfoChipVariant.secondary;

  const DTInfoChip.tertiary({
    super.key,
    this.icon,
    required this.label,
    this.expand = false,
    this.large = false,
  }) : _variant = _DTInfoChipVariant.tertiary;

  const DTInfoChip.success({
    super.key,
    this.icon,
    required this.label,
    this.expand = false,
    this.large = false,
  }) : _variant = _DTInfoChipVariant.success;

  const DTInfoChip.error({
    super.key,
    this.icon,
    required this.label,
    this.expand = false,
    this.large = false,
  }) : _variant = _DTInfoChipVariant.error;

  ({Color background, Color border, Color foreground}) _colors(CoporColors c) => switch (_variant) {
    _DTInfoChipVariant.surface => (
      background: c.surfaceContainer,
      border: c.outline,
      foreground: c.onSurface,
    ),
    _DTInfoChipVariant.primary => (
      background: c.primaryContainer,
      border: c.primaryBorder,
      foreground: c.onPrimaryContainer,
    ),
    _DTInfoChipVariant.secondary => (
      background: c.secondaryContainer,
      border: c.secondaryBorder,
      foreground: c.onSecondaryContainer,
    ),
    _DTInfoChipVariant.tertiary => (
      background: c.tertiaryContainer,
      border: c.tertiaryBorder,
      foreground: c.onTertiaryContainer,
    ),
    _DTInfoChipVariant.success => (
      background: c.successContainer,
      border: c.successBorder,
      foreground: c.onSuccessContainer,
    ),
    _DTInfoChipVariant.error => (
      background: c.errorContainer,
      border: c.errorBorder,
      foreground: c.onErrorContainer,
    ),
  };

  Widget _label(BuildContext context, Color foreground) => Text(
    label,
    style: _kLabelStyle(context, foreground, large: large),
    maxLines: 1,
    overflow: TextOverflow.ellipsis,
    softWrap: false,
  );

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final (:background, :border, :foreground) = _colors(dt.colors);

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: large ? _kLargePaddingH : _kPaddingH,
        vertical: large ? _kLargePaddingV : _kPaddingV,
      ),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(_kBorderRadius),
        border: Border.all(color: border),
      ),
      child: Row(
        mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: large ? _kLargeIconSize : _kIconSize, color: foreground),
            SizedBox(width: large ? _kLargeSpacing : _kSpacing),
          ],
          // Only flexible when the chip was asked to fill a known width —
          // chips also sit inside horizontally scrolling rows, where an
          // unbounded main axis makes a flex child illegal.
          if (expand) Expanded(child: _label(context, foreground)) else _label(context, foreground),
        ],
      ),
    );
  }
}
