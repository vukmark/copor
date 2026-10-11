import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:go_router/go_router.dart';
import 'package:copor_core/src/modules/access_denied/presentation/access_denied_page.dart';

StatefulShellBranch createAccessDeniedRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: AppRoutes.accessDenied,
        pageBuilder: (context, state) => const NoAnimationPage(child: AccessDeniedPage()),
      ),
    ],
  );
}
