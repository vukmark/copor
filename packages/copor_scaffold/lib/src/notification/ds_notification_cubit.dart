import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_notification.dart';
import 'ds_notification_state.dart';

class DSNotificationCubit extends Cubit<DSNotificationState> {
  DSNotificationCubit() : super(const DSNotificationState());

  void addNotification(DSNotification notification) {
    final updated = List<DSNotification>.from(state.notificationList)..add(notification);
    emit(state.copyWith(notificationList: updated));
  }

  void clearNotificationList() => emit(state.copyWith(notificationList: const []));

  void addToInbox(DSNotification notification) {
    final updated = List<DSNotification>.from(state.inbox)..insert(0, notification);
    emit(state.copyWith(inbox: updated));
  }

  void removeFromInbox(String id) {
    final updated = List<DSNotification>.from(state.inbox)..removeWhere((n) => n.id == id);
    emit(state.copyWith(inbox: updated));
  }

  void removeInboxNotification(DSNotification notification) {
    final updated = List<DSNotification>.from(state.inbox);
    final index = updated.indexWhere((item) => identical(item, notification));
    if (index == -1) return;
    updated.removeAt(index);
    emit(state.copyWith(inbox: updated));
  }

  void removeInboxNotifications(Iterable<DSNotification> notifications) {
    final notificationsToRemove = Set<DSNotification>.identity()..addAll(notifications);
    final updated = state.inbox
        .where((notification) => !notificationsToRemove.contains(notification))
        .toList();
    emit(state.copyWith(inbox: updated));
  }

  void clearInbox() => emit(state.copyWith(inbox: const []));
}
