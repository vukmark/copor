import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_cancel_button.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MyAccountScaffold implements DSPageDrawer, DSAppBarTitle, DSAppBarLeading {
  final GoRouterState _currentRoute;

  MyAccountScaffold(this._currentRoute);

  @override
  Widget getLeading() {
    final currentRoute = _currentRoute.fullPath;
    if (currentRoute == AppRoutes.myAccountEditInfo ||
        currentRoute == AppRoutes.myAccountEditPassword) {
      return AppBarCancelButton(onPressed: () => goToPage(AppRoutes.myAccount));
    }
    return Builder(
      builder: (ctx) => ctx.isDesktop
          ? const SizedBox.shrink()
          : DTButton.floating(
              icon: PhosphorIconsThin.list,
              label: '',
              semanticLabel: 'Menu',
              border: !ctx.isMobile,
              onPressed: () => Scaffold.of(ctx).openDrawer(),
            ),
    );
  }

  @override
  Widget getTitle() => ScaffoldTitlePill(icon: (_) => DTIcons.user, label: (t) => t.MY_ACCOUNT);
}
