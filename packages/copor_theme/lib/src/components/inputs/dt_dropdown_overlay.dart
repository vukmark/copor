import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

/// Full-screen tap-to-dismiss layer, placed behind an overlay's anchored
/// content so a tap anywhere outside it closes the overlay.
Widget dtDropdownBackdrop(VoidCallback onDismiss) => Positioned.fill(
  child: GestureDetector(
    behavior: HitTestBehavior.opaque,
    onTap: onDismiss,
    child: const SizedBox.expand(),
  ),
);

/// Low-level open/close plumbing shared by every anchored dropdown-style
/// overlay ([DTDropdown], `DTLanguageButton`, `DTColorPicker`): the
/// [LayerLink]/[OverlayPortalController] pair, the fade+slide entrance
/// animation, and up-vs-down placement. Callers still own their own guard
/// conditions (e.g. `enabled`, empty items, mobile-vs-desktop branching) and
/// any side effects that should run on open/close (search reset, focus, text
/// sync) — [show]/[hide] only drive the overlay's visibility, animation
/// state, and measured placement.
class DTDropdownOverlayHandle {
  final bool isOpen;

  /// True when the panel doesn't fit below the trigger and there's more
  /// room above it — set by [show] from the trigger's on-screen position.
  final bool openUpward;

  /// The panel height [show] measured as actually fitting in the chosen
  /// direction, capped at the `preferredMaxHeight` passed to
  /// [useDropdownOverlay]. Pass this to whatever builds the panel's own
  /// height-constraining widget instead of a hardcoded constant.
  final double resolvedMaxHeight;

  /// Attach to the trigger widget (via [DTDropdownAnchor]) so [show] can
  /// find its on-screen position/size to measure available space.
  final GlobalKey triggerKey;

  final LayerLink layerLink;
  final OverlayPortalController controller;
  final Animation<double> fadeAnim;
  final Animation<Offset> slideAnim;
  final void Function({double? contentHeight}) show;
  final VoidCallback hide;

  const DTDropdownOverlayHandle({
    required this.isOpen,
    required this.openUpward,
    required this.resolvedMaxHeight,
    required this.triggerKey,
    required this.layerLink,
    required this.controller,
    required this.fadeAnim,
    required this.slideAnim,
    required this.show,
    required this.hide,
  });
}

/// [preferredMaxHeight] is the panel height to use whenever there's room for
/// it; [show] measures the trigger's on-screen position and shrinks it (and
/// flips the open direction to upward) when the viewport doesn't have that
/// much space in the chosen direction. [edgeMargin] keeps the panel from
/// touching the very edge of the screen.
///
/// [show] takes an optional `contentHeight` — the caller's best estimate of
/// how tall the panel will actually render (e.g. item count × row height),
/// capped at [preferredMaxHeight]. Pass it whenever it's cheap to compute so
/// a panel with few items isn't flipped upward just because there wouldn't
/// be room for a *full* [preferredMaxHeight] panel below; omitting it falls
/// back to the previous behaviour of sizing the decision to
/// [preferredMaxHeight].
DTDropdownOverlayHandle useDropdownOverlay({
  double preferredMaxHeight = coporDropdownMaxHeight,
  double edgeMargin = 8,
}) {
  final isOpen = useState(false);
  final openUpward = useState(false);
  final resolvedMaxHeight = useState(preferredMaxHeight);
  final triggerKey = useMemoized(() => GlobalKey());
  final layerLink = useMemoized(() => LayerLink());
  final overlayController = useMemoized(() => OverlayPortalController());
  final animController = useAnimationController(duration: coporDropdownAnimDuration);

  final fadeAnim = useMemoized(
    () => CurvedAnimation(parent: animController, curve: Curves.easeOut),
    [animController],
  );
  final slideAnim = useMemoized(
    () => Tween<Offset>(
      begin: const Offset(0, -0.04),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: animController, curve: Curves.easeOut)),
    [animController],
  );

  void show({double? contentHeight}) {
    if (isOpen.value) return;

    // The flip decision should be made against how tall the panel will
    // actually render (e.g. a 1-item list), not the full reserved
    // preferredMaxHeight — otherwise a nearly-empty panel gets flipped
    // upward just because there wouldn't be room for a *full* panel below,
    // even though the real (small) content fits fine.
    final neededHeight = contentHeight != null
        ? contentHeight.clamp(0.0, preferredMaxHeight)
        : preferredMaxHeight;

    final renderBox = triggerKey.currentContext?.findRenderObject();
    if (renderBox is RenderBox && renderBox.hasSize) {
      final triggerTopLeft = renderBox.localToGlobal(Offset.zero);

      final scrollableBox = Scrollable.maybeOf(
        triggerKey.currentContext!,
      )?.context.findRenderObject();
      double viewportTop;
      double viewportBottom;
      if (scrollableBox is RenderBox && scrollableBox.hasSize) {
        final scrollableTopLeft = scrollableBox.localToGlobal(Offset.zero);
        viewportTop = scrollableTopLeft.dy;
        viewportBottom = scrollableTopLeft.dy + scrollableBox.size.height;
      } else {
        final mediaQuery = MediaQuery.of(triggerKey.currentContext!);
        viewportTop = mediaQuery.padding.top;
        viewportBottom = mediaQuery.size.height - mediaQuery.padding.bottom;
      }

      final spaceBelow = viewportBottom - (triggerTopLeft.dy + renderBox.size.height) - edgeMargin;
      final spaceAbove = triggerTopLeft.dy - viewportTop - edgeMargin;

      final fitsBelow = spaceBelow >= neededHeight || spaceBelow >= spaceAbove;
      openUpward.value = !fitsBelow;
      final available = openUpward.value ? spaceAbove : spaceBelow;
      resolvedMaxHeight.value = available.clamp(0.0, preferredMaxHeight).toDouble();
    } else {
      openUpward.value = false;
      resolvedMaxHeight.value = preferredMaxHeight;
    }

    isOpen.value = true;
    overlayController.show();
    animController.forward(from: 0);
  }

  void hide() {
    if (!isOpen.value) return;
    isOpen.value = false;
    animController.reverse().then((_) => overlayController.hide());
  }

  return DTDropdownOverlayHandle(
    isOpen: isOpen.value,
    openUpward: openUpward.value,
    resolvedMaxHeight: resolvedMaxHeight.value,
    triggerKey: triggerKey,
    layerLink: layerLink,
    controller: overlayController,
    fadeAnim: fadeAnim,
    slideAnim: slideAnim,
    show: show,
    hide: hide,
  );
}

class DTOverlayPanel extends StatelessWidget {
  final Widget child;
  final double maxHeight;
  final double elevation;
  final Widget? header;
  final VoidCallback? onScrollBottom;

  const DTOverlayPanel({
    super.key,
    required this.child,
    required this.maxHeight,
    this.elevation = 0,
    this.header,
    this.onScrollBottom,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final r = BorderRadius.circular(kInputBorderRadius);

    return Material(
      elevation: elevation,
      color: dc.surface,
      borderRadius: r,
      clipBehavior: Clip.antiAlias,
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: Border.all(color: dc.outline),
          borderRadius: r,
        ),
        child: ConstrainedBox(
          constraints: BoxConstraints(maxHeight: maxHeight),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (header != null) header!,
              Flexible(
                child: NotificationListener<ScrollNotification>(
                  onNotification: (n) {
                    if (onScrollBottom != null &&
                        n is ScrollUpdateNotification &&
                        n.metrics.pixels >= n.metrics.maxScrollExtent - 80) {
                      onScrollBottom!();
                    }
                    return false;
                  },
                  child: SingleChildScrollView(child: child),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class DTDropdownAnchor extends StatelessWidget {
  final DTDropdownOverlayHandle handle;
  final Widget trigger;
  final Widget Function(BuildContext context, double maxHeight) panelBuilder;
  final bool alignEnd;
  final double horizontalOffset;
  final double verticalGap;
  final double? upwardGap;
  final Object? groupId;

  final VoidCallback? onDismiss;

  const DTDropdownAnchor({
    super.key,
    required this.handle,
    required this.trigger,
    required this.panelBuilder,
    this.alignEnd = false,
    this.horizontalOffset = 0,
    this.verticalGap = coporDropdownOffset,
    this.upwardGap,
    this.groupId,
    this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    final horizontalSign = alignEnd ? 1.0 : -1.0;
    final verticalSign = handle.openUpward ? -1.0 : 1.0;
    final targetAnchor = Alignment(horizontalSign, verticalSign);
    final followerAnchor = Alignment(horizontalSign, -verticalSign);
    final gap = handle.openUpward ? (upwardGap ?? verticalGap) : verticalGap;
    final offset = Offset(horizontalOffset, handle.openUpward ? -gap : gap);

    final overlay = Stack(
      children: [
        dtDropdownBackdrop(onDismiss ?? handle.hide),
        CompositedTransformFollower(
          link: handle.layerLink,
          targetAnchor: targetAnchor,
          followerAnchor: followerAnchor,
          offset: offset,
          child: Align(
            alignment: followerAnchor,
            child: FadeTransition(
              opacity: handle.fadeAnim,
              child: SlideTransition(
                position: handle.slideAnim,
                child: Builder(builder: (ctx) => panelBuilder(ctx, handle.resolvedMaxHeight)),
              ),
            ),
          ),
        ),
      ],
    );

    return CompositedTransformTarget(
      link: handle.layerLink,
      child: OverlayPortal(
        controller: handle.controller,
        overlayChildBuilder: (ctx) =>
            groupId != null ? TapRegion(groupId: groupId, child: overlay) : overlay,
        child: KeyedSubtree(key: handle.triggerKey, child: trigger),
      ),
    );
  }
}
