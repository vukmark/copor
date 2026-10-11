import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/notification_counter_bloc.dart';

class NotificationCounterBlocFactory {
  static NotificationCounterBloc initializeNotificationCounterBloc() {
    return getIt<NotificationCounterBloc>();
  }
}
