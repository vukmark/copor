import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:flutter/material.dart';

/// Shared breakpoint below which layout widgets across the design system
/// (responsive modals, edit-page wrappers, etc.) switch to their mobile
/// layout. Distinct from `DSBreakpoints`/`DSBreakpointsScope` (in
/// `copor_scaffold`), which drives `DSScaffold`'s own desktop/mobile
/// dispatch — that lives in a package built on top of `copor_theme` and
/// can't be depended on from here, so this is the shared home for any
/// widget in this package (or above) that needs the same mobile threshold
/// without going through `DSDeviceContext`.
///
/// 600 comfortably covers every current iPhone (largest is the 16 Pro Max
/// at 440 logical px) with headroom to spare, while staying well below the
/// smallest iPad (744 logical px, iPad mini) — matches Material 3's own
/// compact/medium window-size-class cutoff rather than an arbitrary value.
const double kMobileBreakpoint = 600.0;

/// Shared breakpoint above which a device is treated as desktop-sized
/// rather than tablet, chosen to land at the iPad Pro 12.9" portrait width
/// (1024 logical px) — every iPad (mini through 12.9" Pro) falls between
/// [kMobileBreakpoint] and this value. Matches `kDesktopBreakpoint` in
/// `frontend/lib/src/core/system/device_service.dart`, which feeds the same
/// number into `DSBreakpoints.desktop` — kept as a separate constant here
/// (rather than importing that one) for the same package-direction reason
/// as [kMobileBreakpoint] above.
const double kTabletBreakpoint = 1366.0;

const double coporMaxContentWidth = 1000;
const double coporCompactContentWidth = 480.0;
const double coporNavBarHeight = 65.0;
const EdgeInsets coporPageMargins = EdgeInsets.symmetric(
  vertical: 0,
  horizontal: 20,
);
const EdgeInsets coporPagePadding = EdgeInsets.all(20);
const EdgeInsets coporMobilePagePadding = EdgeInsets.all(12);
const EdgeInsets coporFloatingFormPadding = EdgeInsets.symmetric(
  vertical: 20,
  horizontal: 0,
);

/// Shared margin `DSScaffold` insets its floating content (notification
/// queue, banner, FAB) by, so they align with the page surface's own edge
/// rather than the full-height scaffold background.
const double coporPageBottomMargin = 8.0;

/// Gap between adjacent floating desktop chrome — the rail and the content
/// column beside it, and the appBar/content/bottomNavBar cards stacked
/// within that column. Owned by the caller positioning that chrome (e.g.
/// `DSScaffold`), not by the chrome widgets themselves. Sized to also cover
/// [coporDropShadow]'s own bleed (`blurRadius` 7 + `spreadRadius` 3 ≈ 10) —
/// each card is flush against this gap with no margin of its own, so the
/// gap alone has to leave its `boxShadow` room to render uncut.
const double coporDesktopChromeGap = 12.0;

/// Top/bottom inset from the screen edge for desktop chrome that spans the
/// full height, such as the rail.
const double coporDesktopEdgeMargin = 10.0;

const double coporInputXLarge = 56.0;
const double coporInputLarge = 40.0;
const double coporInputMedium = 35.0;
const double coporInputSmall = 30.0;
const double coporInputExtraSmall = 29.0;

const EdgeInsets coporInputHorizontalPadding = EdgeInsets.symmetric(
  horizontal: 10,
);
const EdgeInsets coporCompactInputHorizontalPadding = EdgeInsets.symmetric(
  horizontal: 6,
);

const double coporBorderRadius = 14.0;
const Radius radius = Radius.circular(coporBorderRadius);

// ── Dropdown overlay ──────────────────────────────────────────────────────────

const Duration coporDropdownAnimDuration = Duration(milliseconds: 160);

/// Minimum time an action's loading spinner stays visible once shown, even
/// if the underlying async work finishes sooner — so fast responses still
/// register as "the action was triggered" rather than flickering. Shared by
/// `DTFloatingLayout`'s full-surface overlay and `CoporButton` (frontend).
const Duration coporMinimumLoadingDuration = Duration(milliseconds: 500);
const double coporDropdownOffset = 0.0;
const double coporDropdownChevronSize = 13.0;
const double coporDropdownMaxHeight = 280.0;
const EdgeInsets coporDropdownItemPadding = EdgeInsets.symmetric(
  horizontal: 12,
  vertical: 12,
);

/// Rough single-row height (label line + [coporDropdownItemPadding] + the
/// hairline divider between rows) — used only as an estimate to decide
/// whether a dropdown panel fits below its trigger before the panel has
/// actually been laid out, not as an exact render size.
const double coporDropdownEstimatedItemHeight = 45.0;

// ── Icon button ───────────────────────────────────────────────────────────────

const coporCompactIconButtonTheme = IconButtonThemeData(
  style: ButtonStyle(
    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    padding: WidgetStatePropertyAll(EdgeInsets.zero),
    minimumSize: WidgetStatePropertyAll(Size(28, 28)),
  ),
);

List<BoxShadow> coporDropShadow(BuildContext context) => [
  BoxShadow(
    color: CoporColors.of(context).shadow.withValues(alpha: 0.05),
    blurRadius: 7,
    spreadRadius: 3,
    offset: Offset.zero,
  ),
];

/// Barrier color used by all DT overlays (dialogs and bottom sheets).
Color coporBarrierColor(BuildContext context) =>
    CoporColors.of(context).scrim.withValues(alpha: 0.3);
