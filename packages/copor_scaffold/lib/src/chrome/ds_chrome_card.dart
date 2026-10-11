import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

/// The floating decorated card (surface color, subtle border, drop shadow,
/// rounded clip) used everywhere the scaffold renders a piece of chrome —
/// the rail, the bottom nav bar, the end-drawer popover, and page content —
/// as a floating card rather than edge-to-edge.
class DSChromeCard extends StatelessWidget {
  final Widget child;
  final BorderRadius borderRadius;

  const DSChromeCard({
    super.key,
    required this.child,
    this.borderRadius = const BorderRadius.all(
      Radius.circular(coporBorderRadius),
    ),
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Container(
      clipBehavior: Clip.none,
      decoration: BoxDecoration(
        color: dt.colors.surface,
        border: BoxBorder.all(color: dt.colors.outlineSubtle),
        borderRadius: borderRadius,
        boxShadow: coporDropShadow(context),
      ),
      child: ClipRRect(
        clipBehavior: Clip.hardEdge,
        borderRadius: borderRadius,
        child: child,
      ),
    );
  }
}
