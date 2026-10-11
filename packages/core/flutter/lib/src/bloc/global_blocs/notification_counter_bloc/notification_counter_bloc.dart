import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/data/repository_impl/notification_counter/notification_counter_repository.dart';
import 'notification_counter_event.dart';
import 'notification_counter_state.dart';

class NotificationCounterBloc extends Bloc<NotificationCounterEvent, NotificationCounterState> {
  final NotificationCounterRepository _notificationCounterRepository;

  NotificationCounterBloc({required NotificationCounterRepository notificationCounterRepository})
    : _notificationCounterRepository = notificationCounterRepository,
      super(NotificationCounterState.initial()) {
    on<GetNotificationsCount>(_onGetNotificationCount);
  }

  Future<void> _onGetNotificationCount(
    GetNotificationsCount event,
    Emitter<NotificationCounterState> emit,
  ) async {
    emit(NotificationCounterState.loading(result: state.result));

    final result = await _notificationCounterRepository.getNotificationCounter();
    result.fold(
      (failure) {
        emit(NotificationCounterState.failure(failure: failure, result: state.result));
      },
      (success) {
        emit(NotificationCounterState.fetched(result: success));
      },
    );
  }
}
