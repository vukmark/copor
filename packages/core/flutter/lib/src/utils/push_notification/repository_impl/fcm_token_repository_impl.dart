import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';

import 'fcm_token_repository.dart';

class FcmTokenRepositoryImpl extends BaseRepository implements FcmTokenRepository {
  final FcmTokenRepositoryRemoteDataSource remoteDataSource;

  FcmTokenRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, void>> save(PushNotificationTokenSaveModel params) async {
    return performNetworkOperation<void>(() async {
      final authorizationTokensModel = await remoteDataSource.save(params);
      return authorizationTokensModel;
    });
  }
}

abstract class FcmTokenRepositoryRemoteDataSource {
  Future<void> save(PushNotificationTokenSaveModel loginCredentials);
}
