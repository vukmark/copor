import 'package:copor_core/src/core/module/module_search_section.dart';
import 'package:copor_core/src/core/module/module_preference_section.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/single_child_widget.dart';

/// An optional feature the app can include or leave out — the frontend
/// counterpart of the server's `CoporModule`. Core never imports a module by
/// name; it loops over `enabledModules` in `lib/modules.dart`.
///
/// Each hook defaults to "nothing", so a module only overrides what it uses.
abstract class CoporModule {
  const CoporModule();

  /// Same name as the server module (`vu_meet`, `todo`, …).
  String get name;

  /// Other modules this one needs; `validateModules` rejects a missing one.
  List<String> get dependsOn => const [];

  /// GetIt registrations (the module's `*_dependency_injection.dart`).
  Future<void> registerDependencies();

  /// Branches added to the authenticated shell route.
  List<StatefulShellBranch> get routeBranches => const [];

  /// Routes `FeatureGuard` lets through without a matching feature.
  List<String> get alwaysAccessibleRoutes => const [];

  /// Bottom-navigation entries (also used by the drawer for the badge dot
  /// and the on-open action of a matching menu route).
  List<ModuleNavEntry> get navEntries => const [];

  /// The page scaffold (`DSPage*` implementation) for [path], or null when the
  /// path isn't this module's. The first module returning one wins.
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) => null;

  /// Providers added to the app root (`CoporApp`).
  List<SingleChildWidget> globalProviders(BuildContext context) => const [];

  /// Result sections the module adds to the core Search page.
  List<ModuleSearchSection> get searchSections => const [];

  /// The module's on/off preferences shown in My Account → Notifications
  /// (stored by the server's module preferences, `PreferencesModel.modulePreferences`).
  List<ModulePreferenceSection> get preferenceSections => const [];

  /// Resets the module's per-user state (caches, selections) on logout.
  Future<void> onLogout() async {}

  /// Opens the in-app notification [notificationId] (end-drawer inbox) if it
  /// belongs to this module; returns whether it did.
  bool openInboxNotification(String notificationId) => false;

  /// Opens the page for a tapped push notification [data] if it belongs to
  /// this module; returns whether it did.
  bool openPushNotification(Map<String, dynamic> data) => false;

  /// Shows a push notification that arrived while the app is in the
  /// foreground if it belongs to this module; returns whether it did
  /// (`NotificationService.handleMessage`).
  Future<bool> handleForegroundPush(RemoteMessage message) async => false;

  /// Handles a WebSocket message ([event], e.g. `CLOUD_NOTIFICATION`) if it
  /// belongs to this module; returns whether it did (`ConnectionManager`).
  bool handleWebSocketMessage(String event, Map<String, dynamic> payload) => false;

  /// Handles a push that arrived while the app was in the background or closed
  /// (`firebaseMessagingBackgroundHandler`, its own isolate — DI is set up,
  /// the widget tree isn't); returns whether it did.
  Future<bool> handleBackgroundPush(RemoteMessage message) async => false;

  /// Runs once push notifications are set up (`initialisePushNotifications`),
  /// e.g. VuMeet's native call UI.
  Future<void> onPushNotificationsInit() async {}

  /// Listeners added around the app scaffold (`AppScaffold`), for reactions
  /// that must not depend on which page is mounted.
  List<SingleChildWidget> scaffoldListeners() => const [];

  /// Lets the module replace a page's app-bar [title] (`ScaffoldUpdater`),
  /// e.g. with a "return to call" pill; the modules apply in list order.
  Widget wrapAppBarTitle(Widget title) => title;

  /// Pages reachable without signing in, added next to login outside the
  /// authenticated shell (e.g. Help's app installation page). Their paths
  /// count as public routes; the module's [pageScaffold] covers them too.
  List<GoRoute> get publicRoutes => const [];

  /// Widgets the login page shows above its sign-in button (e.g. Help's
  /// "install the app" button), in module order.
  List<Widget> loginPageActions(BuildContext context) => const [];

  /// Buttons in the drawer footer, before Logout (e.g. Help's About).
  List<ModuleDrawerLink> get drawerFooterLinks => const [];

  /// Entries in the drawer's debug-only Dev menu.
  List<ModuleDrawerLink> get devMenuLinks => const [];
}

typedef NavLabelBuilder = String Function(CommonTranslation translations);

class ModuleNavEntry {
  final String route;
  final IconData icon;
  final IconData selectedIcon;
  final NavLabelBuilder labelBuilder;

  /// Position in the bottom navigation, sorted together with core's entries.
  final int order;

  /// Shown only when the user's feature list contains [route].
  final bool requiresFeature;

  /// `DSBadgeCubit` key whose count is shown on the entry.
  final String? badgeKey;

  /// Show a dot instead of only the count when the badge is above zero.
  final bool showNotificationDot;

  /// Runs before navigating to [route] from the bottom nav or the drawer.
  final VoidCallback? onOpen;

  const ModuleNavEntry({
    required this.route,
    required this.icon,
    required this.selectedIcon,
    required this.labelBuilder,
    required this.order,
    this.requiresFeature = true,
    this.badgeKey,
    this.showNotificationDot = false,
    this.onOpen,
  });
}

/// A link a module adds to the drawer (footer or Dev menu).
class ModuleDrawerLink {
  final String route;
  final IconData icon;
  final NavLabelBuilder labelBuilder;

  const ModuleDrawerLink({required this.route, required this.icon, required this.labelBuilder});
}

/// Preference sections of [modules], in display order.
List<ModulePreferenceSection> modulePreferenceSections(List<CoporModule> modules) =>
    [for (final module in modules) ...module.preferenceSections]
      ..sort((a, b) => a.order.compareTo(b.order));

/// Search sections of [modules], in display order.
List<ModuleSearchSection> moduleSearchSections(List<CoporModule> modules) =>
    [for (final module in modules) ...module.searchSections]
      ..sort((a, b) => a.order.compareTo(b.order));

/// Throws when a module is listed twice or depends on a module that isn't
/// listed.
void validateModules(List<CoporModule> modules) {
  final names = <String>{};
  for (final module in modules) {
    if (!names.add(module.name)) {
      throw StateError('Module "${module.name}" is registered more than once.');
    }
  }
  for (final module in modules) {
    final missing = module.dependsOn.where((dependency) => !names.contains(dependency)).toList();
    if (missing.isNotEmpty) {
      throw StateError(
        'Module "${module.name}" depends on missing module(s): ${missing.join(', ')}.',
      );
    }
  }
}
