import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/components/scaffold/app_notifications_panel.dart';
import 'package:copor_core/src/components/scaffold/drawer/app_menu_drawer.dart';
import 'package:copor_core/src/components/scaffold/drawer/app_menu_rail.dart';
import 'package:copor_core/src/components/scaffold/dt_bottom_navigation.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/permissions_scaffold.dart';
import 'package:copor_theme/copor_theme.dart' show DTButton, PhosphorIconsThin;
import 'package:copor_scaffold/copor_scaffold.dart'
    show
        DSAppBarActions,
        DSAppBarLeading,
        DSAppBarShell,
        DSAppBarTitle,
        DSDrawerHost,
        DSDrawerSection,
        DSEmptyScaffold,
        DSEndDrawerAnchor,
        DSEndDrawerHost,
        DSEndDrawerSection,
        DSNotificationButton,
        DSNotificationDestination,
        DSPageAppBar,
        DSPageBottomNavBar,
        DSPageDrawer,
        DSPageDrawerSections,
        DSPageEndDrawer,
        DSPageFloatingButton,
        DSPageRail;

export 'package:copor_scaffold/copor_scaffold.dart'
    show
        DSAppBarActions,
        DSAppBarLeading,
        DSAppBarTitle,
        DSDrawerSection,
        DSEmptyScaffold,
        DSEndDrawerSection,
        DSPageAppBar,
        DSPageBottomNavBar,
        DSPageDrawer,
        DSPageDrawerSections,
        DSPageEndDrawer,
        DSPageFloatingButton,
        DSPageRail;
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/access_denied/presentation/access_denied_scaffold.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/administration_dashboard/administration_dashboard_scaffold.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/administration_pages/administration_scaffold.dart';
import 'package:copor_core/src/modules/administration/system_settings/presentation/system_settings_scaffold.dart';
import 'package:copor_core/src/modules/login/contract_sign/presentation/contract_sign_scaffold.dart';
import 'package:copor_core/src/modules/my_account/presentation/my_account_scaffold.dart';
import 'package:copor_core/src/modules/search/presentation/search_scaffold.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/route_cubit.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class ScaffoldUpdater {
  final BuildContext _context;
  final GoRouterState _state;
  final String? _fullPathOverride;

  ScaffoldUpdater(this._context, this._state, {String? fullPath}) : _fullPathOverride = fullPath;

  void update() {
    final appBarCubit = _context.getBloc.appScaffold;
    final routeCubit = _context.read<RouteCubit>();

    final newUri = _state.fullPath ?? _state.uri.path;

    appBarCubit.notifyRouteChanged(_state.uri.path);

    if (routeCubit.state == newUri) return;

    routeCubit.updateRoute(newUri);

    final pageScaffold = getPageScaffold();

    if (pageScaffold == null) {
      return;
    }

    if (pageScaffold is DSEmptyScaffold) {
      appBarCubit.configureEmptyScaffold();
      return;
    }

    appBarCubit.configureScaffold(
      appBar: pageScaffold is DSPageAppBar ? pageScaffold.getAppBar() : const DSAppBarShell(),
      leading: pageScaffold is DSAppBarLeading
          ? pageScaffold.getLeading()
          : (pageScaffold is DSPageDrawer ? _buildMenuLeading() : null),
      title: pageScaffold is DSAppBarTitle
          ? AppModules.enabled.fold<Widget>(
              pageScaffold.getTitle(),
              (title, module) => module.wrapAppBarTitle(title),
            )
          : null,
      actions: _buildAppBarActions(pageScaffold, appBarCubit),
      drawer: pageScaffold is DSPageDrawer ? _buildDrawer(pageScaffold) : null,
      rail: pageScaffold is DSPageRail
          ? pageScaffold.getRail()
          : (pageScaffold is DSPageDrawer ? const AppMenuRail() : null),
      endDrawer: _buildEndDrawer(pageScaffold),
      bottomNavBar: pageScaffold is DSPageBottomNavBar
          ? pageScaffold.getBottomNavBar()
          : const DTBottomNavigation(),
      floatingActionButton: pageScaffold is DSPageFloatingButton
          ? pageScaffold.getFloatingButton()
          : null,
    );
  }

  Widget _buildMenuLeading() {
    return Builder(
      builder: (ctx) => ctx.isDesktop
          ? const SizedBox.shrink()
          : DTButton.floating(
              icon: PhosphorIconsThin.list,
              label: '',
              semanticLabel: 'Menu',
              border: !ctx.isMobile,
              onPressed: () {
                // Always land on the main menu section, regardless of
                // whichever section (e.g. a page's own sidebar) was last
                // selected — this button's icon promises the main menu.
                ctx.getBloc.appScaffold.selectDrawerSection(mainMenuDrawerSectionKey);
                Scaffold.of(ctx).openDrawer();
              },
            ),
    );
  }

  /// The main drawer's default section — the app's own navigation menu.
  /// Pages implementing [DSPageDrawerSections] contribute additional
  /// sections (their own sidebar content) alongside this one; exposed so a
  /// page can name its own section distinctly.
  static const String mainMenuDrawerSectionKey = 'main-menu';

  Widget _buildDrawer(Object pageScaffold) {
    return DSDrawerHost(
      sections: [
        const DSDrawerSection(key: mainMenuDrawerSectionKey, child: AppMenuDrawer()),
        if (pageScaffold is DSPageDrawerSections) ...pageScaffold.getDrawerSections(),
      ],
    );
  }

  List<Widget> _buildAppBarActions(Object pageScaffold, AppScaffoldCubit appBarCubit) {
    return <Widget>[
      ...?(pageScaffold is DSAppBarActions ? pageScaffold.getActions() : null),
      Builder(
        builder: (ctx) => DSEndDrawerAnchor(
          child: DSNotificationButton(
            destination: DSNotificationDestination.bell,
            border: !ctx.isMobile,
            onPressed: () => appBarCubit.showEndDrawerSection(DSNotificationDestination.bell.key),
          ),
        ),
      ),
    ];
  }

  Widget _buildEndDrawer(Object pageScaffold) {
    return DSEndDrawerHost(
      sections: [
        DSEndDrawerSection(
          key: DSNotificationDestination.bell.key,
          child: const AppNotificationsPanel(),
        ),
        if (pageScaffold is DSPageEndDrawer) ...pageScaffold.getEndDrawerSections(),
      ],
    );
  }

  static const Set<String> _emptyScaffoldRoutes = {
    AppRoutes.forgotPassword,
    AppRoutes.login,
    AppRoutes.serverPicker,
    AppRoutes.logout,
    AppRoutes.registration,
    AppRoutes.contractSign,
    AppRoutes.tenantActivation,
  };

  Object? getPageScaffold() {
    final path = _fullPathOverride ?? _state.fullPath ?? '';

    if (_emptyScaffoldRoutes.contains(path)) {
      return const DSEmptyScaffold();
    }

    for (final module in AppModules.enabled) {
      final moduleScaffold = module.pageScaffold(_context, _state, path);
      if (moduleScaffold != null) return moduleScaffold;
    }

    if (path.startsWith('/administration') &&
        path != AppRoutes.administrationDashboard &&
        path != AppRoutes.featureFlags &&
        !path.startsWith(AppRoutes.permissions)) {
      if (_context.isMobile && path.contains('/info/')) {
        return const DSEmptyScaffold();
      }
      return AdministrationScaffold(_state);
    }

    switch (path) {
      case AppRoutes.myAccount:
      case AppRoutes.myAccountEditInfo:
      case AppRoutes.myAccountEditPassword:
        return MyAccountScaffold(_state);
      case AppRoutes.search:
        return SearchScaffold();
      case AppRoutes.tenantActivation:
        return DSEmptyScaffold();
      case AppRoutes.administrationDashboard:
        return AdministrationDashboardScaffold();
      case AppRoutes.accessDenied:
        return const AccessDeniedScaffold();
      case AppRoutes.systemSettings:
      case AppRoutes.systemSettingsForm:
        return SystemSettingsScaffold(_state);
      case AppRoutes.featureFlags:
        return AdministrationScaffold(_state);
      case AppRoutes.permissions:
      case AppRoutes.permissionUserGroup:
      case AppRoutes.permissionRole:
        return const PermissionsScaffold();
      case AppRoutes.contractSign:
        return ContractSignScaffold();
      case AppRoutes.dtShowcase:
      case AppRoutes.scaffoldTester:
        // These pages configure their own title/actions (and everything
        // else page-specific) via `DSScaffoldSetup` once mounted, a frame
        // after this synchronous update runs — but without a case here,
        // `getPageScaffold()` returns null on route-enter and `update()`
        // no-ops, leaving rail/app-bar/bottom-nav at their empty initial
        // state until that postFrame callback fires. Registering them with
        // the default `DSPageDrawer` chrome (rail/drawer/app-bar
        // shell/bottom-nav) here seeds that chrome synchronously, same as
        // every other page, so it doesn't flash in a frame late.
        return const _DevPageScaffold();
      default:
        return null;
    }
  }
}

class _DevPageScaffold implements DSPageDrawer {
  const _DevPageScaffold();
}
