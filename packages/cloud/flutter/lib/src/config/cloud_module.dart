import 'package:copor_core/src/core/module/module_preference_section.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_cloud/src/config/cloud_dependency_injection.dart' as cloud_di;
import 'package:copor_cloud/src/config/cloud_notifications.dart';
import 'package:copor_cloud/src/config/cloud_router.dart';
import 'package:copor_cloud/src/config/cloud_routes.dart';
import 'package:copor_cloud/src/presentation/cloud_scaffold.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

class CloudModule extends CoporModule {
  const CloudModule();

  static const String moduleName = 'cloud';

  @override
  String get name => moduleName;

  @override
  List<ModulePreferenceSection> get preferenceSections => const [
    ModulePreferenceSection(
      titleKey: 'CLOUD_NOTIFICATIONS',
      helpOnKey: 'CLOUD_NOTIFICATIONS_ON',
      helpOffKey: 'CLOUD_NOTIFICATIONS_OFF',
      order: 20,
      toggles: [
        ModulePreferenceToggle(
          preferenceKey: 'cloud.groupFolderNotifications',
          labelKey: 'CLOUD_GROUP_FOLDERS',
        ),
        ModulePreferenceToggle(
          preferenceKey: 'cloud.userFolderNotifications',
          labelKey: 'CLOUD_USER_FOLDER',
        ),
      ],
    ),
  ];

  @override
  Future<void> registerDependencies() => cloud_di.init();

  @override
  List<StatefulShellBranch> get routeBranches => [createCloudRoute()];

  @override
  List<String> get alwaysAccessibleRoutes => const [CloudRoutes.cloud];

  @override
  List<ModuleNavEntry> get navEntries => [
    ModuleNavEntry(
      route: CloudRoutes.cloud,
      icon: PhosphorIconsThin.cloud,
      selectedIcon: PhosphorIconsThin.cloud,
      labelBuilder: (t) => t.CLOUD,
      order: 30,
      onOpen: _refresh,
    ),
  ];

  @override
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) =>
      path == CloudRoutes.cloud ? CloudScaffold() : null;

  @override
  Future<void> onLogout() async {
    getIt<DrivePageCubit>().navigateToRoot();
  }

  // Opens the folder that holds the uploaded file.
  @override
  bool openInboxNotification(String notificationId) {
    if (!CloudNotifications.isCloudNotification(notificationId)) return false;
    CloudNotifications.clearFromInbox();
    _openFolderOfFile(CloudNotifications.fileIdOf(notificationId));
    return true;
  }

  @override
  bool openPushNotification(Map<String, dynamic> data) {
    if (data['type'] != 'CLOUD') return false;
    final fileId = data['fileId'];
    if (fileId is String && fileId.isNotEmpty) {
      _openFolderOfFile(fileId);
    } else {
      getIt<DrivePageCubit>().refreshFolders();
      goToPage(CloudRoutes.cloud);
    }
    return true;
  }

  void _openFolderOfFile(String fileId) {
    getIt<DrivePageCubit>().openFolderOfFile(fileId);
    goToPage(CloudRoutes.cloud);
  }

  @override
  Future<bool> handleForegroundPush(RemoteMessage message) =>
      CloudNotifications.handleForegroundPush(message);

  @override
  bool handleWebSocketMessage(String event, Map<String, dynamic> payload) =>
      CloudNotifications.handleWebSocketMessage(event, payload);

  void _refresh() {
    CloudNotifications.clearFromInbox();
    getIt<DrivePageCubit>().refreshFolders();
  }
}
