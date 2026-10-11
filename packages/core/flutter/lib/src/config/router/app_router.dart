import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_history.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/helper_pages/not_found_page.dart';
import 'package:copor_core/src/config/router/utils/refresh_notifier.dart';
import 'package:copor_core/src/config/router/utils/route_guards.dart';
import 'package:copor_core/src/config/router/utils/router_shell_builders.dart';
import 'package:copor_core/src/modules/access_denied/config/access_denied_route.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/administration_dashboard_route.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/login/contract_sign/config/contract_sign_route.dart';
import 'package:copor_core/src/modules/login/forgot_password/config/forgot_password_route.dart';
import 'package:copor_core/src/modules/login/login/config/login_route.dart';
import 'package:copor_core/src/modules/login/tenant_activation/config/tenant_activation_route.dart';
import 'package:copor_core/src/modules/login/server_picker/config/server_picker_route.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/search/config/search_router.dart';
import 'package:copor_core/src/modules/my_account/config/my_account_router.dart';
import 'package:copor_core/src/modules/login/registration/config/registration_route.dart';
import 'package:copor_core/src/modules/dev/dev_routes.dart';
import 'package:copor_core/src/utils/global_keys.dart';
import 'package:flutter/foundation.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:go_router/go_router.dart';

final GoRouter appRouter = GoRouter(
  refreshListenable: GoRouterRefreshNotifier(
    getIt<ConfigBloc>(),
    getIt<AuthorizationBloc>(),
    getIt<FeatureAccessBloc>(),
    getIt<AccountInfoBloc>(),
  ),
  navigatorKey: rootNavigatorKey,
  initialLocation: AppRoutes.login,
  redirect: appRedirect,
  errorBuilder: (context, state) => NotFoundPage(state: state),
  routes: [
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        if (!AppRoutes.overlayRoutes.contains(state.fullPath)) {
          getIt<NavigationHistory>().push(
            NavigationHistoryModel(uri: state.uri.toString(), pathName: state.fullPath!),
          );
        }
        ScaffoldUpdater(context, state).update();
        return buildShellForUnauthenticated(context, state, navigationShell);
      },
      branches: [
        StatefulShellBranch(
          routes: [
            if (kDebugMode) ...createDevRoutes(),
            createServerPickerRoute(),
            createLoginRoute(),
            createForgotPasswordRoute(),
            createTenantActivationRoute(),
            createRegistrationRoute(),
            for (final module in AppModules.enabled) ...module.publicRoutes,
            StatefulShellRoute.indexedStack(
              builder: (context, state, navigationShell) {
                return buildShellForAuthenticated(context, state, navigationShell);
              },
              branches: [
                for (final module in AppModules.enabled) ...module.routeBranches,
                createSearchRoute(),
                createMyAccountRoute(),
                createContractSignRoute(),
                createAdministrationDashboardRoute(),
                createAccessDeniedRoute(),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);
