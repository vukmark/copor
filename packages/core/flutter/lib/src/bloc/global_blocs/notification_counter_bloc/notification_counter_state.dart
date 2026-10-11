import 'package:copor_core/src/data/model/notification_counter/notification_counter_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class NotificationCounterState extends BaseState<NotificationCounterModel> {
  const NotificationCounterState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const NotificationCounterState.initial() : this._(result: null);
  const NotificationCounterState.loading({required Result<NotificationCounterModel>? result})
    : this._(result: result, isLoading: true);
  const NotificationCounterState.fetched({required Result<NotificationCounterModel> result})
    : this._(result: result);
  const NotificationCounterState.failure({
    required Failure failure,
    required Result<NotificationCounterModel>? result,
  }) : this._(result: result, failure: failure);

  @override
  NotificationCounterState copyWith({
    Result<NotificationCounterModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return NotificationCounterState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
