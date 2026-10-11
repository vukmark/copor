import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

import 'app_menu_drawer.dart';

/// Full-height, permanently docked counterpart to [AppMenuDrawer].
///
/// Same header/navigation/footer widgets as the drawer — same menu items,
/// same feature-access gating, same selected-route highlighting — but hosted
/// in [DTMenuRail] instead of a Material `Drawer`, and without the
/// pop-on-navigate behavior a slide-over drawer needs.
class AppMenuRail extends StatelessWidget {
  const AppMenuRail({super.key});

  @override
  Widget build(BuildContext context) {
    return const DTMenuRail(
      header: AppDrawerHeader(closeOnNavigate: false),
      content: AppDrawerNavigation(closeOnNavigate: false),
      footer: AppDrawerFooter(closeOnNavigate: false),
    );
  }
}
