import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/data/model/notification_counter/notification_counter_model.dart';
import 'package:copor_core/src/data/repository_impl/notification_counter/notification_counter_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class NotificationCounterRepositoryImpl extends BaseRepository
    implements NotificationCounterRepository {
  final NotificationCounterRemoteDataSource remoteDataSource;

  NotificationCounterRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<NotificationCounterModel>>> getNotificationCounter() {
    return performOperationAndMapToResult<NotificationCounterModel>(
      remoteOperation: () {
        return performNetworkOperation<NotificationCounterModel>(() async {
          final model = await remoteDataSource.getNotificationCounter();
          return model;
        });
      },
    );
  }
}

abstract class NotificationCounterRemoteDataSource {
  Future<NotificationCounterModel> getNotificationCounter();
}
