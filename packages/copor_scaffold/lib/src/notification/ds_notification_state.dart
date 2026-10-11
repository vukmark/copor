import 'ds_notification.dart';

class DSNotificationState {
  final List<DSNotification> notificationList;

  final List<DSNotification> inbox;

  const DSNotificationState({
    this.notificationList = const [],
    this.inbox = const [],
  });

  DSNotificationState copyWith({
    List<DSNotification>? notificationList,
    List<DSNotification>? inbox,
  }) => DSNotificationState(
    notificationList: notificationList ?? this.notificationList,
    inbox: inbox ?? this.inbox,
  );
}
