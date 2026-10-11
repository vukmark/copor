import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

const _kBorderRadius = coporBorderRadius;
const _kIndicatorAlpha = 0.07;
const _kHoverAlpha = 0.1;

class DTTabBar extends StatelessWidget implements PreferredSizeWidget {
  final List<Widget> tabs;
  final TabController? controller;
  final ValueChanged<int>? onTap;

  const DTTabBar({super.key, required this.tabs, this.controller, this.onTap});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    return TabBar(
      dividerColor: dc.outline,
      indicatorSize: TabBarIndicatorSize.tab,
      indicator: ShapeDecoration(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(_kBorderRadius),
            topRight: Radius.circular(_kBorderRadius),
          ),
        ),
        color: dc.onPrimaryContainer.withValues(alpha: _kIndicatorAlpha),
      ),
      splashBorderRadius: const BorderRadius.only(
        topLeft: Radius.circular(_kBorderRadius),
        topRight: Radius.circular(_kBorderRadius),
      ),
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.hovered))
          return dc.surfaceContainer.withValues(alpha: _kHoverAlpha);
        return null;
      }),
      controller: controller,
      onTap: onTap,
      tabs: tabs,
    );
  }
}
