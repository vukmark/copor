import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/notification_counter_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/notification_counter_event.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class NotificationCounterDispatcher {
  static _NotificationCounter notificationCounter = _NotificationCounter();
}

class _NotificationCounter {
  void getNotificationsCount() {
    final bloc = getIt<NotificationCounterBloc>();
    bloc.add(GetNotificationsCount());
  }
}
