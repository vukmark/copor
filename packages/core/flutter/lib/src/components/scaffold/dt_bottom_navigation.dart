import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_event.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/notification_counter_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/notification_counter_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/components/scaffold/nav_transition_overlay.dart';
import 'package:copor_core/src/utils/global_keys.dart';
import 'package:copor_core/src/utils/home_route_resolver.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Connects app BLoCs (navigation, notifications, translations) to [DTNavBar].
///
/// Badge counts are owned by [DSBadgeCubit.badgeCounts] — it is the
/// single source of truth for display.  This widget bridges the server-side
/// [NotificationCounterBloc] into the scaffold cubit whenever a fresh count
/// is fetched (e.g. on login or manual refresh).
///
/// Real-time increments (WS / push) are applied directly to the scaffold
/// cubit by the notification handler — this widget does not need to be
/// updated for that path.
class DTBottomNavigation extends StatelessWidget {
  const DTBottomNavigation({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<NotificationCounterBloc, NotificationCounterState>(
      // Only react when a successful fetch lands with new data.
      listenWhen: (prev, curr) =>
          curr.result?.data != null && curr.result?.data != prev.result?.data && !curr.isLoading,
      listener: (ctx, state) {
        final data = state.result!.data;
        final cubit = ctx.read<DSBadgeCubit>();
        cubit.setBadgeCount(NotificationDestinations.vuMeet.key, data.vuMeet);
        cubit.setBadgeCount(NotificationDestinations.desk.key, data.todo);
      },
      child: _NavBarBuilder(),
    );
  }
}

class _NavBarBuilder extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;
    final navigationState = context.watch<NavigationCubit>().state;
    final notificationCounterState = context.watch<NotificationCounterBloc>().state;
    final accountInfoState = context.watch<AccountInfoBloc>().state;
    final featureAccessState = context.watch<FeatureAccessBloc>().state;
    final featureList = featureAccessState.result?.data.featureList ?? [];
    // Desk stands in for whatever the actor's actual home page resolves to
    // (e.g. Administration) when TODO isn't enabled for them
    // — see resolveHomeRoute — so it should read as selected there too.
    final homeRoute = resolveHomeRoute(context);

    // An empty, but normal-height `DTNavBar` while loading — not
    // `SizedBox.shrink()`. `DSScaffold` wraps whatever this returns in its
    // own floating card; collapsing to zero height there collapsed the
    // card down to just its border, showing as a thin line rather than a
    // normal (if empty) bottom nav bar until translations/counts arrived.
    if (BlocStateConditions.hasInitialStates([
      translationState,
      notificationCounterState,
      accountInfoState,
      featureAccessState,
    ])) {
      return DTNavBar(
        containerKey: const Key(GlobalKeys.bottomNavBar),
        items: const [],
        isMobile: context.isMobile,
        floating: !context.isMobile,
      );
    }

    // Badge counts come from the scaffold cubit — single source of truth.
    final badges = context.select<DSBadgeCubit, Map<String, int>>((c) => c.state.badgeCounts);

    // Entries gated by a feature only appear when the user's feature list
    // unlocks them. The backend's `Feature` values are the route paths
    // themselves, so the route doubles as the feature key here.
    final items = AppRoutes.bottomNavBarItems
        .where((item) => !item.requiresFeature || featureList.contains(item.route))
        .where((item) => item.route != AppRoutes.homepage || homeRoute != null)
        .map((item) {
          final isHome = item.route == AppRoutes.homepage;
          final selected = isHome
              ? navigationState.selectedRoute.startsWith(homeRoute!)
              : navigationState.selectedRoute.startsWith(item.route);
          final count = item.badgeKey == null ? 0 : badges[item.badgeKey] ?? 0;

          return DTNavBarItem(
            icon: item.icon,
            label: item.labelBuilder(translationState.ensuredData),
            count: count,
            showNotificationDot: item.showNotificationDot && count > 0,
            selected: selected,
            onTap: () {
              final route = isHome ? homeRoute! : item.route;
              item.onOpen?.call();
              NavTransitionOverlay.overlayKey.currentState?.startIfNeeded(
                navigationState.selectedRoute,
                route,
              );
              context.read<NavigationCubit>().add(NavigateToRoute(route));
            },
          );
        })
        .toList();

    // `DSScaffold` floats the bottom nav bar in its own card at both tablet
    // and desktop width (with a rail) or without one (tablet's real drawer
    // instead) — so "floating" here just needs to track `context.isMobile`.
    return DTNavBar(
      containerKey: const Key(GlobalKeys.bottomNavBar),
      items: items,
      isMobile: context.isMobile,
      floating: !context.isMobile,
    );
  }
}
