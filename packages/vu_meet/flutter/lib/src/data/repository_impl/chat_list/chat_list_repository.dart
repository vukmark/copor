import 'package:dartz/dartz.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/create_new_chat_req_body_dto.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/edit_chat_req_body_dto.dart';

abstract class ChatListRepository {
  Future<Either<Failure, Result<List<ChatListItemModel>>>> getChatList(String filterByName);
  Future<Either<Failure, Result<String>>> getNewChatId(CreateNewChatReqBodyDto users);
  Future<Either<Failure, Result<String>>> editChat(EditChatReqBodyDto body);
  Future<void> clearLocalCache();
}
