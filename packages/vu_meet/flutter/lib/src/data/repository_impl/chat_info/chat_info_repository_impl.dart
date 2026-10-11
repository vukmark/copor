import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/data_source/chat_info/chat_info_remote_source.dart';
import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_model.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_info/chat_info_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class ChatInfoRepositoryImpl extends BaseRepository implements ChatInfoRepository {
  final ChatInfoRemoteDataSource remoteDataSource;

  ChatInfoRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<ChatInfoModel>>> getChatInfo({required String chatId}) {
    return performOperationAndMapToResult<ChatInfoModel>(
      remoteOperation: () {
        return performNetworkOperation<ChatInfoModel>(() async {
          final model = await remoteDataSource.getChatInfo(chatId);
          return model;
        });
      },
    );
  }
}
