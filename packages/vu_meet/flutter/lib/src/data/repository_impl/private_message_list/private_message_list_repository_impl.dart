import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/data_source/private_message_list/private_message_list_local_source.dart';
import 'package:copor_vu_meet/src/data/data_source/private_message_list/private_message_list_remote_source.dart';
import 'package:copor_vu_meet/src/data/repository_impl/private_message_list/private_message_list_repository.dart';
import 'package:copor_vu_meet/src/data/model/private_message_list/private_message_list_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class PrivateMessageListRepositoryImpl extends BaseRepository
    implements PrivateMessageListRepository {
  final PrivateMessageListRemoteDataSource remoteDataSource;
  final PrivateMessageListLocalDataSource localDataSource;

  PrivateMessageListRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<PrivateMessageListItemModel>>>> getPrivateMessageList() {
    return performOperationAndMapToResult<List<PrivateMessageListItemModel>>(
      localOperation: () {
        return performLocalStorageOperation<List<PrivateMessageListItemModel>>(
          localDataSource.getPrivateMessageList,
        );
      },
      remoteOperation: () {
        return performNetworkOperation<List<PrivateMessageListItemModel>>(() async {
          final model = await remoteDataSource.getPrivateMessageList();
          await localDataSource.setPrivateMessageList(model);
          return model;
        });
      },
    );
  }
}
