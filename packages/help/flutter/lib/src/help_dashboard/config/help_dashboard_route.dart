import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_help/src/config/help_routes.dart';
import 'package:copor_help/src/help_dashboard/presentation/help_dashboard_page.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createHelpDashboardRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: HelpRoutes.helpDashboard,
        pageBuilder: (context, state) => NoAnimationPage(child: const HelpDashboardPage()),
      ),
    ],
  );
}
