import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_help/src/config/help_routes.dart';
import 'package:copor_help/src/tools/presentation/tools_dashboard_page.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createToolsDashboardRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: HelpRoutes.toolsDashboard,
        pageBuilder: (context, state) => NoAnimationPage(child: const ToolsDashboardPage()),
      ),
    ],
  );
}
