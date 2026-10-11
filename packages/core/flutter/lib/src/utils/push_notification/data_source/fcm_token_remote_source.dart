import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';
import 'package:copor_core/src/utils/push_notification/repository_impl/fcm_token_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'fcm_token_remote_source.g.dart';

@RestApi()
abstract class FcmTokenRemoteDataSourceImpl implements FcmTokenRepositoryRemoteDataSource {
  factory FcmTokenRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _FcmTokenRemoteDataSourceImpl;

  @override
  @POST('/notification-token')
  Future<void> save(@Body() PushNotificationTokenSaveModel message);
}
