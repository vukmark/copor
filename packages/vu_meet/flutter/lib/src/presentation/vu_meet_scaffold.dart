import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_back_button.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class VuMeetScaffold implements DSPageDrawer, DSAppBarTitle, DSAppBarLeading {
  final GoRouterState _currentRoute;

  VuMeetScaffold(this._currentRoute);

  @override
  Widget getTitle() => ScaffoldTitlePill(icon: (_) => DTIcons.message, label: (t) => t.VU_MEET);

  @override
  Widget getLeading() {
    return Builder(
      builder: (context) {
        final isChatRoute =
            _currentRoute.fullPath == VuMeetRoutes.vu_meet_chat ||
            _currentRoute.fullPath == VuMeetRoutes.vu_meet_chat_info;

        final cameFromProfile = findMostRecentUri(AppRoutes.viewProfile) != null;

        if (isChatRoute && (context.isMobile || cameFromProfile)) {
          final onBack = cameFromProfile ? () => goBackToPath(AppRoutes.viewProfile) : goBack;
          return AppBarBackButton(onPressed: onBack);
        }

        return context.isDesktop
            ? const SizedBox.shrink()
            : DTButton.floating(
                icon: PhosphorIconsThin.list,
                label: '',
                semanticLabel: 'Menu',
                border: !context.isMobile,
                onPressed: () => Scaffold.of(context).openDrawer(),
              );
      },
    );
  }
}
