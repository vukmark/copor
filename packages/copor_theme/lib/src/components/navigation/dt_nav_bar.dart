import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/dt_chrome_metrics.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

const _kMobileIconSize = 24.0;
const _kDesktopIconSize = 20.0;
const _kDesktopLabelSpacing = 10.0;
const _kNotificationDotSize = 8.0;
const _kMobileNotificationDotOffset = -2.0;
const _kDesktopFontSize = 15.0;
const _kSplashAlpha = 0.15;
const _kHighlightAlpha = 0.10;
const _kHoverAlpha = 0.08;
const _kLabelHeight = 1.0;

TextStyle _kNavLabelStyle(BuildContext context, Color color) =>
    Theme.of(context).textTheme.labelMedium!.copyWith(
      color: color,
      fontWeight: FontWeight.w400,
      fontSize: _kDesktopFontSize,
      height: _kLabelHeight,
    );

class DTNavBarItem {
  final IconData icon;
  final String label;
  final int count;
  final bool showNotificationDot;
  final bool selected;
  final VoidCallback onTap;

  const DTNavBarItem({
    required this.icon,
    required this.label,
    required this.count,
    this.showNotificationDot = false,
    required this.selected,
    required this.onTap,
  });
}

class DTNavBar extends StatelessWidget {
  final List<DTNavBarItem> items;
  final Key? containerKey;
  final bool isMobile;
  final double height;

  /// True when this bar sits inside its own floating card (desktop-with-rail
  /// layout) that the caller (`DSScaffold`) draws one level up, rather than
  /// docked flush to the physical bottom edge. When true, this widget skips
  /// its own background/border/shadow entirely and just supplies the bare
  /// content — see `DSScaffold._buildFloatingCard`, which needs to draw the
  /// card outside any clipping `Navigator`/`Overlay` ancestor for its shadow
  /// to bleed correctly (same reasoning as the desktop content card).
  final bool floating;

  const DTNavBar({
    super.key,
    required this.items,
    this.containerKey,
    this.isMobile = false,
    this.height = coporNavBarHeight,
    this.floating = false,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final borderRadius = isMobile
        ? BorderRadius.zero
        : const BorderRadius.only(topLeft: radius, topRight: radius);
    final contentHeight = DTChromeMetrics.maybeOf(context)?.bottomNavBarContentHeight ?? height;

    final navItems = SafeArea(
      top: false,
      child: SizedBox(
        height: contentHeight,
        child: Row(
          children: items.map((item) => _NavItem(item: item, isMobile: isMobile)).toList(),
        ),
      ),
    );

    // Horizontal margin from the screen/rail edges is the caller's job (see
    // `DSPageWrapper` in `copor_scaffold`) — this widget only centers itself
    // and caps its width.
    //
    // `heightFactor: 1` keeps this shrink-wrapped to the content's own
    // height instead of expanding to fill the slot (`Align` otherwise fills
    // all available space on an unconstrained axis) — that reported height
    // is `contentHeight` plus whatever the inner `SafeArea` added, so the
    // host scaffold sizes its `bottomNavigationBar` slot correctly without
    // needing to know that number itself.
    //
    // `SafeArea` sits *inside* the decorated `Container` (when not
    // [floating]), not around it, so the background/border/shadow still
    // bleed full-bleed to the physical bottom edge while only the nav items
    // get pushed up off the inset.
    return Align(
      alignment: Alignment.bottomCenter,
      heightFactor: 1,
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: coporMaxContentWidth),
        child: SizedBox(
          key: containerKey,
          width: double.infinity,
          child: floating
              ? Material(type: MaterialType.transparency, child: navItems)
              : Container(
                  decoration: BoxDecoration(
                    color: dc.surface,
                    borderRadius: borderRadius,
                    border: Border.all(color: dc.outlineSubtle, width: 1.0),
                    boxShadow: coporDropShadow(context),
                  ),
                  child: ClipRRect(
                    borderRadius: borderRadius,
                    child: Material(type: MaterialType.transparency, child: navItems),
                  ),
                ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final DTNavBarItem item;
  final bool isMobile;

  const _NavItem({required this.item, this.isMobile = false});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final color = item.selected ? dc.onPrimaryContainer : dc.onSurface;

    return Expanded(
      child: Ink(
        color: item.selected ? dc.primaryContainer : null,
        child: InkWell(
          onTap: item.onTap,
          splashColor: dc.primary.withValues(alpha: _kSplashAlpha),
          highlightColor: dc.primary.withValues(alpha: _kHighlightAlpha),
          hoverColor: dc.primary.withValues(alpha: _kHoverAlpha),
          child: SizedBox.expand(
            child: isMobile
                ? _MobileContent(item: item, color: color)
                : _DesktopContent(item: item, color: color),
          ),
        ),
      ),
    );
  }
}

class _MobileContent extends StatelessWidget {
  final DTNavBarItem item;
  final Color color;

  const _MobileContent({required this.item, required this.color});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: _NavIconWithNotificationDot(
        icon: item.icon,
        color: color,
        size: _kMobileIconSize,
        showNotificationDot: item.showNotificationDot,
      ),
    );
  }
}

class _DesktopContent extends StatelessWidget {
  final DTNavBarItem item;
  final Color color;

  const _DesktopContent({required this.item, required this.color});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(item.icon, color: color, size: _kDesktopIconSize),
        const SizedBox(width: _kDesktopLabelSpacing),
        Flexible(
          child: Text(
            item.label,
            style: _kNavLabelStyle(context, color),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        if (item.showNotificationDot) ...[
          const SizedBox(width: 4),
          const _NotificationDot(),
        ],
      ],
    );
  }
}

class _NavIconWithNotificationDot extends StatelessWidget {
  final IconData icon;
  final Color color;
  final double size;
  final bool showNotificationDot;

  const _NavIconWithNotificationDot({
    required this.icon,
    required this.color,
    required this.size,
    required this.showNotificationDot,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Icon(icon, color: color, size: size),
        if (showNotificationDot)
          const Positioned(
            top: _kMobileNotificationDotOffset,
            right: _kMobileNotificationDotOffset,
            child: _NotificationDot(),
          ),
      ],
    );
  }
}

class _NotificationDot extends StatelessWidget {
  const _NotificationDot();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _kNotificationDotSize,
      height: _kNotificationDotSize,
      decoration: BoxDecoration(color: CoporColors.of(context).primary, shape: BoxShape.circle),
    );
  }
}
