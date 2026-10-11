import 'package:copor_core/src/data/model/notification_counter/notification_counter_model.dart';
import 'package:copor_core/src/data/repository_impl/notification_counter/notification_counter_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'notification_counter_remote_source_impl.g.dart';

@RestApi()
abstract class NotificationCounterRemoteSourceImpl implements NotificationCounterRemoteDataSource {
  factory NotificationCounterRemoteSourceImpl(Dio dio, {String baseUrl}) =
      _NotificationCounterRemoteSourceImpl;

  @override
  @GET('/notification/count')
  Future<NotificationCounterModel> getNotificationCounter();
}
