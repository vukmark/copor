import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_help/src/about/config/about_router.dart';
import 'package:copor_help/src/about/presentation/about_scaffold.dart';
import 'package:copor_help/src/app_installation_page/app_installation_button.dart';
import 'package:copor_help/src/app_installation_page/app_installation_page_route.dart';
import 'package:copor_help/src/config/help_routes.dart';
import 'package:copor_help/src/help_dashboard/config/help_dashboard_route.dart';
import 'package:copor_help/src/help_dashboard/presentation/help_dashboard_scaffold.dart';
import 'package:copor_help/src/tools/config/tools_dashboard_route.dart';
import 'package:copor_help/src/tools/presentation/tools_dashboard_scaffold.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSEmptyScaffold;

/// Help dashboard, About (changelog), Tools and the public app installation
/// page, plus the login page's "install the app" button and the drawer's About
/// button. The server's `help` module declares the features and serves the
/// changelog (`ChangeLogService`).
class HelpModule extends CoporModule {
  const HelpModule();

  @override
  String get name => 'help';

  @override
  Future<void> registerDependencies() async {}

  @override
  List<StatefulShellBranch> get routeBranches => [
    createAboutRoute(),
    createHelpDashboardRoute(),
    createToolsDashboardRoute(),
  ];

  @override
  List<String> get alwaysAccessibleRoutes => const [
    HelpRoutes.about,
    HelpRoutes.helpDashboard,
    HelpRoutes.toolsDashboard,
  ];

  @override
  List<GoRoute> get publicRoutes => [createAppInstallationRoute()];

  @override
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) => switch (path) {
    HelpRoutes.about => AboutScaffold(),
    HelpRoutes.helpDashboard => HelpDashboardScaffold(),
    HelpRoutes.toolsDashboard => ToolsDashboardScaffold(),
    HelpRoutes.appInstallationPage => DSEmptyScaffold(),
    _ => null,
  };

  @override
  List<Widget> loginPageActions(BuildContext context) => [AppInstallationButton()];

  @override
  List<ModuleDrawerLink> get drawerFooterLinks => [
    ModuleDrawerLink(
      route: HelpRoutes.about,
      icon: PhosphorIconsThin.info,
      labelBuilder: (translations) => translations.ABOUT,
    ),
  ];
}
