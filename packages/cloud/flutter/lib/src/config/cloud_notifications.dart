import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_cloud/src/helpers/cloud_notification_content.dart';
import 'package:copor_cloud/src/helpers/cloud_notification_deduplicator.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/utils/push_notification/notification_service.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSNotification;
import 'package:copor_theme/copor_theme.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';

/// Cloud's upload notifications. The server sends each one both as a
/// WebSocket message (`CLOUD_NOTIFICATION`) and as an FCM push
/// (`type: CLOUD`); whichever arrives first is shown, [CloudNotificationDeduplicator]
/// drops the other. In the inbox they are keyed `cloud:<id>`.
abstract final class CloudNotifications {
  static const _idPrefix = 'cloud:';

  static bool isCloudNotification(String inboxId) => inboxId.startsWith(_idPrefix);

  /// The uploaded file's id; the server uses it as the notification id.
  static String fileIdOf(String inboxId) => inboxId.substring(_idPrefix.length);

  static bool handleWebSocketMessage(String event, Map<String, dynamic> payload) {
    if (event != 'CLOUD_NOTIFICATION') return false;

    debugPrint('📩 [CloudNotification][WebSocket] \n payload=$payload \n');
    final notificationId = payload['notificationId'];
    final title = payload['title'];
    final body = payload['body'];
    if (notificationId is! String || notificationId.isEmpty || title is! String || body is! String) {
      return true;
    }

    final content = CloudNotificationContent.fromPayload(
      payload: payload,
      fallbackTitle: title,
      fallbackBody: body,
    );
    final id = '$_idPrefix$notificationId';
    if (!CloudNotificationDeduplicator.claim(id)) return true;
    _show(id, content);
    return true;
  }

  static Future<bool> handleForegroundPush(RemoteMessage message) async {
    if (message.data['type'] != 'CLOUD') return false;

    final notification = message.notification;
    final content = CloudNotificationContent.fromPayload(
      payload: message.data,
      fallbackTitle: notification?.title ?? 'Cloud update',
      fallbackBody: notification?.body ?? '',
    );
    final notificationId = message.data['notificationId'] as String? ?? message.messageId ?? 'cloud';
    final id = '$_idPrefix$notificationId';
    if (!CloudNotificationDeduplicator.claim(id)) return true;

    await NotificationService.showLocalNotification(
      id: (message.messageId ?? '$notificationId${content.title}${content.body}').hashCode,
      title: content.title,
      body: content.body,
    );
    _show(id, content);
    return true;
  }

  /// Removes every Cloud notification from the inbox (opening Cloud shows them all).
  static void clearFromInbox() {
    final scaffoldCubit = getIt<AppScaffoldCubit>();
    final cloudNotificationIds = scaffoldCubit.notificationCubit.state.inbox
        .where((notification) => isCloudNotification(notification.id))
        .map((notification) => notification.id)
        .toSet();
    for (final notificationId in cloudNotificationIds) {
      scaffoldCubit.removeInboxCluster(notificationId);
    }
  }

  static void _show(String id, CloudNotificationContent content) {
    final notification = DSNotification(
      id: id,
      title: content.title,
      body: content.body,
      icon: DTIcons.cloud,
      unreadCount: 1,
    );
    final scaffoldCubit = getIt<AppScaffoldCubit>();
    scaffoldCubit.addNotification(notification);
    scaffoldCubit.addToInbox(notification);
    scaffoldCubit.incrementBadgeCount(NotificationDestinations.bell.key);
    getIt<DrivePageCubit>().refreshFolders();
  }
}
