import 'package:copor_scaffold/src/utils/ds_device_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

/// Single source of truth for both thresholds — `DSScaffold`'s own layout
/// dispatch reads [kMobileBreakpoint]/[kTabletBreakpoint] directly, so
/// `context.isMobile`/`isTablet`/`isDesktop` (via [DSDeviceContext]) have to
/// be built from the exact same two values, not independently-chosen ones,
/// or they silently drift apart again (as they did before: this file used
/// to declare its own `kDesktopBreakpoint = 1024.0`, while `DSScaffold`
/// dispatched on `kTabletBreakpoint = 1366.0` — the mismatch is what made
/// the bottom nav bar, the drawer-menu button, and the app bar all flip
/// style at the wrong width).
const DSBreakpoints appBreakpoints = DSBreakpoints(
  mobile: kMobileBreakpoint,
  desktop: kTabletBreakpoint,
);

extension DevicePlatformContext on BuildContext {
  bool get isWebPlatform => kIsWeb;
  bool get isMobilePlatform =>
      !kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.iOS ||
          defaultTargetPlatform == TargetPlatform.android);
  bool get isIOS => defaultTargetPlatform == TargetPlatform.iOS;
  bool get isAndroid => defaultTargetPlatform == TargetPlatform.android;
  bool get isMobileWeb =>
      !kDebugMode &&
      kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.android ||
          defaultTargetPlatform == TargetPlatform.iOS);

  bool get isMobile => DSDeviceContext(this).isMobile;
  bool get isTablet => DSDeviceContext(this).isTablet;
  bool get isDesktop => DSDeviceContext(this).isDesktop;
}

class DeviceService extends ChangeNotifier {
  static final DeviceService instance = DeviceService._internal();
  DeviceService._internal();

  late MediaQueryData _mediaQuery;

  void update(BuildContext context) {
    _mediaQuery = MediaQuery.of(context);
    notifyListeners();
  }

  bool get isMobile => width < kTabletBreakpoint;
  bool get isDesktop => width >= kTabletBreakpoint;

  bool get isPortrait => _mediaQuery.orientation == Orientation.portrait;
  bool get isLandscape => _mediaQuery.orientation == Orientation.landscape;

  double get width => _mediaQuery.size.width;
  double get height => _mediaQuery.size.height;
}
