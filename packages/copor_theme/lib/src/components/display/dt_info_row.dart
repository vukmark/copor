import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

class DTInfoRow extends StatelessWidget {
  final IconData icon;
  final String label;

  const DTInfoRow({super.key, required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 4),
          decoration: BoxDecoration(
            border: Border.all(color: dc.outlineSubtle),
            borderRadius: BorderRadius.circular(6),
          ),
          child: Icon(icon, size: 13, color: dc.onSurfaceSubtle),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: Text(
            label,
            style: dt.bodySecondary,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

enum _DTLabelRowVariant { surface, primary, secondary, tertiary, success, error }

/// A key-value row displayed as a single bordered pill split by a vertical divider.
///
/// The label side uses a tinted background; the value side uses [CoporColors.surface].
/// If [value] is omitted the label fills the full width with no divider.
///
/// Use the named constructors to apply semantic colour variants:
/// ```dart
/// DTLabelRow(label: translation.STATUS, value: 'Active')
/// DTLabelRow.success(label: translation.STATUS, value: 'Active')
/// DTLabelRow.error(label: translation.ERROR, icon: Icons.warning)
/// ```
class DTLabelRow extends StatelessWidget {
  final String label;
  final String? value;
  final Widget? valueWidget;
  final IconData? icon;
  final bool smallLabels;
  final _DTLabelRowVariant _variant;

  const DTLabelRow({super.key, required this.label, this.value, this.valueWidget, this.icon, this.smallLabels = true})
      : _variant = _DTLabelRowVariant.surface;

  const DTLabelRow.primary({super.key, required this.label, this.value, this.valueWidget, this.icon, this.smallLabels = true})
      : _variant = _DTLabelRowVariant.primary;

  const DTLabelRow.secondary({super.key, required this.label, this.value, this.valueWidget, this.icon, this.smallLabels = true})
      : _variant = _DTLabelRowVariant.secondary;

  const DTLabelRow.tertiary({super.key, required this.label, this.value, this.valueWidget, this.icon, this.smallLabels = true})
      : _variant = _DTLabelRowVariant.tertiary;

  const DTLabelRow.success({super.key, required this.label, this.value, this.valueWidget, this.icon, this.smallLabels = true})
      : _variant = _DTLabelRowVariant.success;

  const DTLabelRow.error({super.key, required this.label, this.value, this.valueWidget, this.icon, this.smallLabels = true})
      : _variant = _DTLabelRowVariant.error;

  /// Stacks multiple rows inside a single shared border with horizontal
  /// dividers between them.
  ///
  /// ```dart
  /// DTLabelRow.group(children: [
  ///   DTLabelRow(label: translation.STREET_ADDRESS, value: address),
  ///   DTLabelRow(label: translation.POSTAL_CODE, value: postalCode),
  ///   DTLabelRow.success(label: translation.STATUS, value: 'Active'),
  /// ])
  /// ```
  static Widget group({required List<DTLabelRow> children}) =>
      _DTLabelRowGroup(children: children);

  ({Color background, Color border, Color foreground}) _colors(CoporColors c) =>
      switch (_variant) {
        _DTLabelRowVariant.surface   => (background: c.surfaceBackground, border: c.outline,          foreground: c.onSurface),
        _DTLabelRowVariant.primary   => (background: c.primaryContainer,  border: c.primaryBorder,    foreground: c.onPrimaryContainer),
        _DTLabelRowVariant.secondary => (background: c.secondaryContainer, border: c.secondaryBorder, foreground: c.onSecondaryContainer),
        _DTLabelRowVariant.tertiary  => (background: c.tertiaryContainer,  border: c.tertiaryBorder,  foreground: c.onTertiaryContainer),
        _DTLabelRowVariant.success   => (background: c.successContainer,   border: c.successBorder,   foreground: c.onSuccessContainer),
        _DTLabelRowVariant.error     => (background: c.errorContainer,     border: c.errorBorder,     foreground: c.onErrorContainer),
      };

  Widget _buildContent(BuildContext context, CoporColors dc, CoporTheme dt) {
    final (:background, :border, :foreground) = _colors(dc);

    final labelCell = ColoredBox(
      color: background,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        child: Row(
          children: [
            if (icon != null) ...[
              Icon(icon!, size: 13, color: foreground),
              const SizedBox(width: 10),
            ],
            Flexible(
              child: Text(
                label,
                style: smallLabels
                    ? dt.text.labelDefault.copyWith(color: foreground)
                    : dt.text.body.copyWith(color: foreground),
              ),
            ),
          ],
        ),
      ),
    );

    if (value == null && valueWidget == null) return labelCell;

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(child: labelCell),
          VerticalDivider(width: 1, thickness: 1, color: border),
          Expanded(
            child: ColoredBox(
              color: dc.surface,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                child: value != null
                    ? Text(value!, style: dt.text.body)
                    : valueWidget!,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final dt = CoporTheme.of(context);
    final border = _colors(dc).border;
    final radius = BorderRadius.circular(coporBorderRadius);

    return DecoratedBox(
      position: DecorationPosition.foreground,
      decoration: BoxDecoration(border: Border.all(color: border), borderRadius: radius),
      child: ClipRRect(
        borderRadius: radius,
        child: _buildContent(context, dc, dt),
      ),
    );
  }
}

class _DTLabelRowGroup extends StatelessWidget {
  final List<DTLabelRow> children;

  const _DTLabelRowGroup({required this.children});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final dt = CoporTheme.of(context);
    final radius = BorderRadius.circular(coporBorderRadius);
    final dividerColor = dc.outline;

    return DecoratedBox(
      position: DecorationPosition.foreground,
      decoration: BoxDecoration(border: Border.all(color: dividerColor), borderRadius: radius),
      child: ClipRRect(
        borderRadius: radius,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (int i = 0; i < children.length; i++) ...[
              if (i > 0) Divider(height: 1, thickness: 1, color: dividerColor),
              children[i]._buildContent(context, dc, dt),
            ],
          ],
        ),
      ),
    );
  }
}
