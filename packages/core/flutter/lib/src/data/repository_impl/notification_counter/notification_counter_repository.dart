import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/notification_counter/notification_counter_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class NotificationCounterRepository {
  Future<Either<Failure, Result<NotificationCounterModel>>> getNotificationCounter();
}
