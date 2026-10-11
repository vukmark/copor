import 'package:copor_vu_meet/src/data/model/private_message_list/private_message_list_model.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'private_message_list_remote_source.g.dart';

abstract class PrivateMessageListRemoteDataSource {
  Future<List<PrivateMessageListItemModel>> getPrivateMessageList();
}

@RestApi()
abstract class PrivateMessageListRemoteDataSourceImpl
    implements PrivateMessageListRemoteDataSource {
  factory PrivateMessageListRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _PrivateMessageListRemoteDataSourceImpl;

  /**
    EXAMPLE:
    @override
    @GET("/locale/{namespace}")
    Future<PrivateMessageListModel> getPrivateMessageList(@Path("namespace") String namespace,
    @Header('Accept-Language') String languageCode);

    @override
    @PATCH("/locale/{namespace}")
    Future<void> updatePrivateMessageList(
    @Path("namespace") PrivateMessageListModel translationModel,
    @Header('Accept-Language') String languageCode);
 **/
  @override
  @GET('/vu-meet/message/list/chatId/messageId')
  Future<List<PrivateMessageListItemModel>> getPrivateMessageList();
}
