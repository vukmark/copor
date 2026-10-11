import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';

abstract class FcmTokenRepository {
  Future<Either<Failure, void>> save(PushNotificationTokenSaveModel saveTokenParams);
}
