import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/create_new_chat_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/edit_chat_req_body_dto.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'chat_list_remote_source.g.dart';

abstract class ChatListRemoteDataSource {
  Future<List<ChatListItemModel>> getChatList(String filterByName);

  Future<String> getNewChatId(CreateNewChatReqBodyDto users);

  Future<String> editChat(EditChatReqBodyDto body);
}

@RestApi()
abstract class ChatListRemoteDataSourceImpl implements ChatListRemoteDataSource {
  factory ChatListRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _ChatListRemoteDataSourceImpl;

  @override
  @GET('/vu-meet/user-chats/{searchedName}')
  Future<List<ChatListItemModel>> getChatList(@Path('searchedName') String searchedName);

  @override
  @POST('/vu-meet/chat/user')
  Future<String> getNewChatId(@Body() CreateNewChatReqBodyDto users);

  @override
  @PATCH('/vu-meet/chat')
  Future<String> editChat(@Body() EditChatReqBodyDto body);
}
