import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:flutter/material.dart';

const _kPaddingH = 5.0;
const _kPaddingV = 0.0;
const _kBorderRadius = 100.0;
const _kFontSize = 11.0;

TextStyle _kBadgeStyle(BuildContext context) {
  final dc = CoporColors.of(context);
  return Theme.of(context).textTheme.labelSmall!.copyWith(
    color: dc.onPrimaryContainer,
    fontWeight: FontWeight.w400,
    fontSize: _kFontSize,
  );
}

/// A circular badge that displays a numeric [count].
///
/// Typically overlaid on an icon via a [Stack] + [Positioned].
/// Hidden automatically when [count] is zero.
class DTBadge extends StatelessWidget {
  final int count;

  const DTBadge({super.key, required this.count});

  @override
  Widget build(BuildContext context) {
    if (count <= 0) return const SizedBox.shrink();
    final dc = CoporColors.of(context);

    return Container(
      clipBehavior: Clip.hardEdge,
      decoration: BoxDecoration(
        color: dc.surface,
        borderRadius: BorderRadius.circular(_kBorderRadius),
        border: Border.all(color: dc.primaryBorder),
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: _kPaddingH, vertical: _kPaddingV),
        decoration: BoxDecoration(
          color: dc.primaryContainer,
        ),
        child: Text(
          count.toString(),
          style: _kBadgeStyle(context),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
