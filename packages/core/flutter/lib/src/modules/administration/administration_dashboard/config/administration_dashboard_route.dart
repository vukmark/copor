import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/utils/administration_page_builder.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/administration_dashboard/administration_dashboard_page.dart';
import 'package:copor_core/src/modules/administration/feature_flags/config/feature_page_scope.dart';
import 'package:copor_core/src/modules/administration/feature_flags/presentation/feature_page.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/permissions_page.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/permissions_role_page.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/permissions_user_group_page.dart';
import 'package:copor_core/src/modules/administration/user_groups/presentation/user_groups_page.dart';
import 'package:go_router/go_router.dart';

const List<AdministrationPageBuilder> administrationPageList = [
  RolePage(),
  UserPage(),
  ContractTypePage(),
  DeletionRequestsPage(),
  TagPage(),
  RegionPage(),
  RegionCityPage(),
  LanguagePage(),
  NativeLanguagePage(),
  TenantPage(),
  LogPage(),
  SystemSettingsPage(),
  StatePage(),
  ContentItemsPage(),
  AiContextItemPage(),
];

List<RouteBase> createAdministrationRoutes(List<AdministrationPageBuilder> administrationPageList) {
  return administrationPageList.expand((page) => page.createRoute()).toList();
}

StatefulShellBranch createAdministrationDashboardRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: AppRoutes.administrationDashboard,
        pageBuilder: (context, state) =>
            NoAnimationPage(key: state.pageKey, child: const AdministrationDashboardPage()),
      ),
      GoRoute(
        path: AppRoutes.featureFlags,
        pageBuilder: (context, state) => NoAnimationPage(
          key: state.pageKey,
          child: FeaturePageScope(
            id: FeaturePageScope.featurePageScopeString,
            child: const FeaturePage(),
          ),
        ),
      ),
      GoRoute(
        path: AppRoutes.permissions,
        pageBuilder: (context, state) =>
            NoAnimationPage(key: state.pageKey, child: const PermissionsPage()),
      ),
      GoRoute(
        path: AppRoutes.permissionUserGroup,
        pageBuilder: (context, state) =>
            NoAnimationPage(key: state.pageKey, child: const PermissionsUserGroupPage()),
      ),
      GoRoute(
        path: AppRoutes.permissionRole,
        pageBuilder: (context, state) =>
            NoAnimationPage(key: state.pageKey, child: const PermissionsRolePage()),
      ),
      GoRoute(
        path: AppRoutes.userGroups,
        pageBuilder: (context, state) =>
            NoAnimationPage(key: state.pageKey, child: const UserGroupsPage()),
      ),
      ...createAdministrationRoutes(administrationPageList),
    ],
  );
}
