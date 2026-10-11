import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_model.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'chat_info_remote_source.g.dart';

abstract class ChatInfoRemoteDataSource {
  Future<ChatInfoModel> getChatInfo(String chatId);
}

@RestApi()
abstract class ChatInfoRemoteDataSourceImpl implements ChatInfoRemoteDataSource {
  factory ChatInfoRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _ChatInfoRemoteDataSourceImpl;

  @override
  @GET('/vu-meet/chat/info/{chatId}')
  Future<ChatInfoModel> getChatInfo(@Path('chatId') String chatId);
}
