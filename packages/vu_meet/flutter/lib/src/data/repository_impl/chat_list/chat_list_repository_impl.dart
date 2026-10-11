import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/data_source/chat_list/chat_list_local_source.dart';
import 'package:copor_vu_meet/src/data/data_source/chat_list/chat_list_remote_source.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/create_new_chat_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/edit_chat_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_list/chat_list_repository.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class ChatListRepositoryImpl extends BaseRepository implements ChatListRepository {
  final ChatListRemoteDataSource remoteDataSource;
  final ChatListLocalDataSource localDataSource;

  ChatListRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<ChatListItemModel>>>> getChatList(String filterByName) {
    return performOperationAndMapToResult<List<ChatListItemModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<ChatListItemModel>>(() async {
          return await localDataSource.getChatList();
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<ChatListItemModel>>(() async {
          final chatList = await remoteDataSource.getChatList(filterByName);
          await localDataSource.setChatList(chatList);
          return chatList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<String>>> getNewChatId(CreateNewChatReqBodyDto users) {
    return performOperationAndMapToResult<String>(
      remoteOperation: () async {
        return performNetworkOperation<String>(() async {
          final newChatId = await remoteDataSource.getNewChatId(users);
          return newChatId;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<String>>> editChat(EditChatReqBodyDto body) {
    return performOperationAndMapToResult<String>(
      remoteOperation: () async {
        return performNetworkOperation<String>(() async {
          final newChatId = await remoteDataSource.editChat(body);
          return newChatId;
        });
      },
    );
  }

  @override
  Future<void> clearLocalCache() async {
    await localDataSource.clear();
  }
}
