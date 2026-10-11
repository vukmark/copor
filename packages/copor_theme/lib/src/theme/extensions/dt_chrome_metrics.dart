import 'package:flutter/widgets.dart';

/// Ambient app-bar / bottom-nav-bar content heights, provided by a host
/// scaffold (e.g. `DSScaffold`) so it can decide chrome sizing per
/// breakpoint centrally, while [DTAppBar]/[DTNavBar] still own *how* to
/// apply the safe-area inset around that content — their background keeps
/// bleeding full-bleed to the physical edge, only the content itself gets
/// pushed off the inset.
///
/// Widgets not mounted under a provider (standalone usage, outside any
/// `DSScaffold`) fall back to their own constructor defaults.
class DTChromeMetrics extends InheritedWidget {
  final double? appBarContentHeight;
  final double? bottomNavBarContentHeight;

  const DTChromeMetrics({
    super.key,
    this.appBarContentHeight,
    this.bottomNavBarContentHeight,
    required super.child,
  });

  static DTChromeMetrics? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<DTChromeMetrics>();

  @override
  bool updateShouldNotify(DTChromeMetrics oldWidget) =>
      appBarContentHeight != oldWidget.appBarContentHeight ||
      bottomNavBarContentHeight != oldWidget.bottomNavBarContentHeight;
}
