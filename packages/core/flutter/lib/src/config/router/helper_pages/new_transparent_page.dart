import 'package:copor_core/src/core/system/device_service.dart';
import 'package:flutter/material.dart';

class NewTransparentPage extends Page {
  final Widget child;

  const NewTransparentPage({
    required this.child,
    super.key,
    super.name,
    super.arguments,
    super.restorationId,
  });

  @override
  Route createRoute(BuildContext context) {
    final bool isMobileLayout = context.isMobile;

    return PageRouteBuilder(
      settings: this,
      opaque: isMobileLayout,
      barrierDismissible: true,
      barrierColor: null,
      pageBuilder: (context, animation, secondaryAnimation) {
        if (isMobileLayout) {
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
