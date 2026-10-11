import 'package:copor_theme/copor_theme.dart' show coporNavBarHeight;
import 'package:flutter/material.dart' show kToolbarHeight;
import '../banner/ds_banner.dart';

class DSScaffoldConfig {
  final Duration? Function(DSBannerType type)? autoDismissDurationProvider;

  final bool showLoadingDebugOverlay;

  final double mobileAppBarHeight;

  final double desktopAppBarHeight;

  final double mobileBottomNavBarHeight;

  final double desktopBottomNavBarHeight;

  const DSScaffoldConfig({
    this.autoDismissDurationProvider,
    this.showLoadingDebugOverlay = false,
    this.mobileAppBarHeight = kToolbarHeight,
    this.desktopAppBarHeight = kToolbarHeight,
    this.mobileBottomNavBarHeight = coporNavBarHeight,
    this.desktopBottomNavBarHeight = coporNavBarHeight,
  });

  Duration? autoDismissDurationFor(DSBannerType type) {
    if (autoDismissDurationProvider != null) {
      return autoDismissDurationProvider!(type);
    }
    return switch (type) {
      DSBannerType.error => null,
      DSBannerType.warning => const Duration(seconds: 4),
      DSBannerType.success => const Duration(seconds: 3),
      DSBannerType.info => const Duration(seconds: 2),
    };
  }
}
