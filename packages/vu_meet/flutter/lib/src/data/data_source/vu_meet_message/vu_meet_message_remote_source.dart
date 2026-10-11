import 'dart:typed_data';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_list_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_message_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'vu_meet_message_remote_source.g.dart';

abstract class VuMeetMessageRemoteDataSource {
  Future<List<VuMeetMessageItemModel>> getVuMeetMessage(GetVuMeetMessageListReqBodyDto dto);

  Future<HttpResponse<Uint8List>> getVuMeetMessageFile(String fileId);

  Future<void> sendMessage(SendVuMeetMessageReqBodyDto messageDto);

  Future<void> sendFileMessage({
    required MultipartFile file,
    required String content,
    required String type,
    required String chat,
  });

  Future<dynamic> changeTypingStatus(TypingStatusReqBody body);

  Future<void> markChatSeen(String chatId);
}

@RestApi()
abstract class VuMeetMessageRemoteDataSourceImpl implements VuMeetMessageRemoteDataSource {
  factory VuMeetMessageRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _VuMeetMessageRemoteDataSourceImpl;

  @override
  @POST('/vu-meet/message/list')
  Future<List<VuMeetMessageItemModel>> getVuMeetMessage(@Body() GetVuMeetMessageListReqBodyDto dto);

  @override
  @GET('/vu-meet/message/file/{fileId}')
  @DioResponseType(ResponseType.bytes)
  Future<HttpResponse<Uint8List>> getVuMeetMessageFile(@Path("fileId") String fileId);

  @override
  @POST('/vu-meet/message')
  Future<void> sendMessage(@Body() SendVuMeetMessageReqBodyDto message);

  @override
  @POST("/vu-meet/message")
  @MultiPart()
  Future<dynamic> sendFileMessage({
    @Part(name: "content") required String content,
    @Part(name: "type") required String type,
    @Part(name: "chat") required String chat,
    @Part(name: "file") required MultipartFile file,
  });

  @override
  @POST('/vu-meet/chat/typing-status')
  Future<void> changeTypingStatus(@Body() TypingStatusReqBody body);

  @override
  @GET('/vu-meet/chat/mark-seen/{chatId}')
  Future<void> markChatSeen(@Path('chatId') String chatId);
}
