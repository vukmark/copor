import 'package:flutter/material.dart';

/// A [Page] that renders its [child] with a fade transition.
///
/// On mobile ([isMobile] = true) the route is opaque and covers the screen.
/// On desktop the route is transparent with a subtle dark scrim behind [child].
///
/// Pass [isMobile] explicitly — this widget has no device-service dependency.
class DTTransparentPage extends Page {
  final Widget child;
  final bool isMobile;

  const DTTransparentPage({
    required this.child,
    this.isMobile = false,
    super.key,
    super.name,
    super.arguments,
    super.restorationId,
  });

  @override
  Route createRoute(BuildContext context) {
    return PageRouteBuilder(
      settings: this,
      opaque: isMobile,
      barrierDismissible: false,
      barrierColor: isMobile ? null : Colors.black.withValues(alpha: 0.08),
      pageBuilder: (context, animation, secondaryAnimation) {
        if (isMobile) {
          return child;
        }
        return Center(child: child);
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(opacity: animation, child: child);
      },
    );
  }
}
