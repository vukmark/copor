import 'dart:async';
import 'dart:convert';

import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _notificationInboxKey = 'app_scaffold_notification_inbox';
const _badgeCountsKey = 'app_scaffold_badge_counts';

class PersistentNotificationCubit extends DSNotificationCubit {
  final SharedPreferences _preferences;

  PersistentNotificationCubit(this._preferences) {
    final storedInbox = _preferences.getString(_notificationInboxKey);
    if (storedInbox == null) return;

    try {
      final items = (jsonDecode(storedInbox) as List<dynamic>)
          .cast<Map<String, dynamic>>()
          .map(DSNotification.fromJson)
          .toList();
      emit(DSNotificationState(inbox: items));
    } on Object {
      unawaited(_preferences.remove(_notificationInboxKey));
    }
  }

  void _persistInbox() {
    unawaited(
      _preferences.setString(
        _notificationInboxKey,
        jsonEncode(state.inbox.map((notification) => notification.toJson()).toList()),
      ),
    );
  }

  @override
  void addToInbox(DSNotification notification) {
    super.addToInbox(notification);
    _persistInbox();
  }

  @override
  void removeFromInbox(String id) {
    super.removeFromInbox(id);
    _persistInbox();
  }

  @override
  void removeInboxNotification(DSNotification notification) {
    super.removeInboxNotification(notification);
    _persistInbox();
  }

  @override
  void removeInboxNotifications(Iterable<DSNotification> notifications) {
    super.removeInboxNotifications(notifications);
    _persistInbox();
  }

  @override
  void clearInbox() {
    super.clearInbox();
    unawaited(_preferences.remove(_notificationInboxKey));
  }
}

class PersistentBadgeCubit extends DSBadgeCubit {
  final SharedPreferences _preferences;

  PersistentBadgeCubit(this._preferences) {
    final storedCounts = _preferences.getString(_badgeCountsKey);
    if (storedCounts == null) return;

    try {
      final counts = (jsonDecode(storedCounts) as Map<String, dynamic>).map(
        (key, value) => MapEntry(key, (value as num).toInt()),
      );
      for (final entry in counts.entries) {
        super.setBadgeCount(entry.key, entry.value);
      }
    } on Object {
      unawaited(_preferences.remove(_badgeCountsKey));
    }
  }

  void _persistCounts() {
    unawaited(_preferences.setString(_badgeCountsKey, jsonEncode(state.badgeCounts)));
  }

  @override
  void setBadgeCount(String destinationKey, int count) {
    super.setBadgeCount(destinationKey, count);
    _persistCounts();
  }

  @override
  void clearBadgeCount(String destinationKey) {
    super.clearBadgeCount(destinationKey);
    _persistCounts();
  }

  @override
  void clearAllBadgeCounts() {
    super.clearAllBadgeCounts();
    unawaited(_preferences.remove(_badgeCountsKey));
  }
}
