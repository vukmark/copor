import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_help/src/config/help_routes.dart';
import 'package:copor_help/src/app_installation_page/app_installation_page.dart';
import 'package:go_router/go_router.dart';

GoRoute createAppInstallationRoute() {
  return GoRoute(
    path: HelpRoutes.appInstallationPage,
    pageBuilder: (context, state) => const NoAnimationPage(child: AppInstallation()),
  );
}
