import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:go_router/go_router.dart';


abstract class Routers {
  List<RouteBase> getRoutes();
}

class AppRoutes {
  // Set per app in lib/modules.dart.
  static String get homepage => AppModules.homeRoute;
  static const String dtShowcase = '/dt-showcase';
  static const String scaffoldTester = '/scaffold-tester';
  static const String login = '/login';
  static const String serverPicker = '/server-picker';
  static const String contentItem = '/administration/content-item';
  static const String search = '/search';
  static const String myAccount = '/my-account';
  static const String myAccountEditInfo = '/my-account/edit';
  static const String myAccountEditPassword = '/my-account/edit-password';
  static const String registration = '/registration';
  static const String tenantActivation = '/tenant-activation';
  static const String logout = '/logout';
  static const String forgotPassword = '/forgot-password';
  static const String tenant = '/administration/tenant';
  static const String user = '/administration/user';
  static const String deletionRequests = '/administration/deletion-requests';
  static const String userGroups = '/administration/user-groups';
  static const String userEdit = '/administration/user/edit/:id';
  static const String language = '/administration/language';
  static const String nativeLanguage = '/administration/native-language';
  static const String region = '/administration/region';
  static const String regionCity = '/administration/region-city';
  static const String tag = '/administration/tag';
  static const String state = '/administration/state';
  static const String contractType = '/administration/contract-type';
  static const String role = '/administration/role';
  static const String log = '/administration/log';
  static const String administrationDashboard = '/administration-dashboard';
  static const String aiContextItem = '/administration/ai-context-item';

  static const String featureFlags = '/administration/feature-flags';
  static const String permissions = '/administration/permissions';
  static const String permissionUserGroup = '/administration/permissions/user-group';
  static const String permissionRole = '/administration/permissions/role';

  static const String viewProfile = '/profile/:id';
  static const String editUserProfile = '/profile/:id/edit';
  static const String accessDenied = '/access-denied';
  static const String systemSettings = '/administration/system-settings';
  static const String systemSettingsForm = '/system-settings/edit/:type';
  static const String contractSign = '/contract-sign';


  // Routes rendered as transparent overlays / modals (ModalRouteHost or
  // NewTransparentPage). Excluded from NavigationHistory so goBack() never
  // lands on one of these and re-triggers the modal.
  static const Set<String> overlayRoutes = {editUserProfile};

  static const List<String> all = [
    search,
    deletionRequests,
    contentItem,
    myAccount,
    user,
    userGroups,
    language,
    nativeLanguage,
    region,
    regionCity,
    tag,
    state,
    contractType,
    role,
    log,
    administrationDashboard,
    featureFlags,
    permissions,
    permissionUserGroup,
    permissionRole,
    accessDenied,
    systemSettings,
    systemSettingsForm,
    viewProfile,
    aiContextItem,
  ];

  static final List<String> alwaysAccessibleRoutes = [
    myAccount,
    search,

    /// dev routes
    dtShowcase,
    scaffoldTester,

    for (final module in AppModules.enabled) ...module.alwaysAccessibleRoutes,
  ];

  static final List<String> publicRoutes = [
    AppRoutes.login,
    AppRoutes.registration,
    AppRoutes.tenantActivation,
    AppRoutes.forgotPassword,
    AppRoutes.serverPicker,
    for (final module in AppModules.enabled) ...module.publicRoutes.map((route) => route.path),
  ];

  /// Core's bottom-nav entries plus every enabled module's, by `order`.
  /// The home entry (Desk) opens whatever `resolveHomeRoute` picks for the
  /// user, see `DTBottomNavigation`.
  static final List<ModuleNavEntry> bottomNavBarItems = [
    ModuleNavEntry(
      route: homepage,
      icon: PhosphorIconsThin.house,
      selectedIcon: PhosphorIconsThin.house,
      labelBuilder: (t) => t.DESK,
      order: 10,
      requiresFeature: false,
      badgeKey: NotificationDestinations.desk.key,
    ),
    ModuleNavEntry(
      route: search,
      icon: PhosphorIconsThin.magnifyingGlass,
      selectedIcon: PhosphorIconsThin.magnifyingGlass,
      labelBuilder: (t) => t.SEARCH,
      order: 40,
    ),
    for (final module in AppModules.enabled) ...module.navEntries,
  ]..sort((a, b) => a.order.compareTo(b.order));

  static int getBottomNavBarIndexFromRoute(String route) {
    final index = bottomNavBarItems.lastIndexWhere((item) => route.startsWith(item.route));
    return index;
  }

  static String getBottomNavBarRouteFromIndex(int index) {
    return bottomNavBarItems[index].route;
  }
}
