import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/components/scaffold/app_notifications_panel.dart';
import 'package:copor_core/src/components/scaffold/drawer/app_menu_drawer.dart';
import 'package:copor_core/src/components/scaffold/drawer/app_menu_rail.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/components/scaffold/dt_bottom_navigation.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_scaffold_dev/copor_scaffold_dev.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

List<GoRoute> createDevRoutes() => [
  GoRoute(
    path: AppRoutes.dtShowcase,
    pageBuilder: (context, state) => NoAnimationPage(
      key: state.pageKey,
      child: _DTShowcaseRoute(routeContext: context),
    ),
  ),
  GoRoute(
    path: AppRoutes.scaffoldTester,
    pageBuilder: (context, state) => NoAnimationPage(
      key: state.pageKey,
      child: _ScaffoldTesterRoute(routeContext: context),
    ),
  ),
];

/// The same drawer-opening leading button every other page gets from
/// `ScaffoldUpdater._buildMenuLeading` — hidden on desktop, where the
/// persistent rail already gives access to navigation.
///
/// A dedicated `const`-constructible widget rather than a `Builder(...)`
/// literal: `DTShowcasePage`/`DSScaffoldTesterPage` forward this straight
/// through to `DSScaffoldSetup.leading`, whose change-detection compares
/// `identical()` widget instances — a fresh `Builder` here would look
/// "changed" on every rebuild of these routes (they're kept alive
/// off-stage by the outer `StatefulShellRoute.indexedStack`), re-pushing
/// this page's chrome into the shared `DSChromeCubit` and clobbering
/// whatever page navigated to next. `const _MenuLeading()` stays the same
/// instance across rebuilds, so it doesn't trip that check.
class _MenuLeading extends StatelessWidget {
  const _MenuLeading();

  @override
  Widget build(BuildContext context) {
    return context.isDesktop
        ? const SizedBox.shrink()
        : DTButton.floating(
            icon: PhosphorIconsThin.list,
            label: '',
            semanticLabel: 'Menu',
            border: !context.isMobile,
            onPressed: () {
              // Always land on the host drawer section, regardless of
              // whichever section (e.g. DT Showcase's own category-tree
              // toggle) was last selected — this button's icon promises
              // the main menu, same as `ScaffoldUpdater._buildMenuLeading`
              // always re-selecting `mainMenuDrawerSectionKey` first.
              context.read<DSScaffoldController>().selectDrawerSection(
                DTShowcasePage.hostDrawerSectionKey,
              );
              Scaffold.of(context).openDrawer();
            },
          );
  }
}

/// Wires up what's genuinely app-specific for the showcase: the real app
/// menu as its rail/drawer (matching how `_ScaffoldTesterRoute` wires
/// `DSScaffoldTesterPage` below) and how theme changes reach the app's
/// `PreferencesBloc`.
class _DTShowcaseRoute extends StatelessWidget {
  final BuildContext routeContext;

  const _DTShowcaseRoute({required this.routeContext});

  @override
  Widget build(BuildContext context) {
    return DTShowcasePage(
      drawer: const AppMenuDrawer(),
      rail: const AppMenuRail(),
      leading: const _MenuLeading(),
      bottomNavBar: const DTBottomNavigation(),
      notificationsPanel: const AppNotificationsPanel(),
      onThemeToggle: () {
        final prefs = routeContext.read<PreferencesBloc>().state.ensuredData;
        final next = switch (prefs.themeMode) {
          ThemeMode.light => ThemeMode.dark,
          ThemeMode.dark => ThemeMode.system,
          ThemeMode.system => ThemeMode.light,
        };
        PreferencesBlocEventDispatcher.preferences.updatePreferences(
          routeContext.read<PreferencesBloc>(),
          UpdatePreferencesDTO.fromModel(prefs).copyWith(themeMode: next),
        );
      },
    );
  }
}

/// The tester page's own devtools UI (notifications inbox, settings panel,
/// bell/gear triggers) lives in `DSScaffoldTesterPage` itself — this route
/// only wires up what's genuinely app-specific: the drawer/rail content and
/// how dark-mode changes reach the app's `PreferencesBloc`.
class _ScaffoldTesterRoute extends StatelessWidget {
  final BuildContext routeContext;

  const _ScaffoldTesterRoute({required this.routeContext});

  void _setDarkMode(bool isDark) {
    final prefs = routeContext.read<PreferencesBloc>().state.ensuredData;
    PreferencesBlocEventDispatcher.preferences.updatePreferences(
      routeContext.read<PreferencesBloc>(),
      UpdatePreferencesDTO.fromModel(
        prefs,
      ).copyWith(themeMode: isDark ? ThemeMode.dark : ThemeMode.light),
    );
  }

  @override
  Widget build(BuildContext context) {
    return DSScaffoldTesterPage(
      drawer: const AppMenuDrawer(),
      rail: const AppMenuRail(),
      onDarkModeChanged: _setDarkMode,
      leading: const _MenuLeading(),
      bottomNavBar: const DTBottomNavigation(),
      notificationsPanel: const AppNotificationsPanel(),
    );
  }
}
