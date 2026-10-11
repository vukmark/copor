class CloudNotificationDeduplicator {
  static const int _maxRememberedNotifications = 200;
  static final Set<String> _handledNotificationIds = <String>{};

  static bool claim(String notificationId) {
    if (_handledNotificationIds.contains(notificationId)) return false;

    _handledNotificationIds.add(notificationId);
    if (_handledNotificationIds.length > _maxRememberedNotifications) {
      _handledNotificationIds.remove(_handledNotificationIds.first);
    }
    return true;
  }
}
