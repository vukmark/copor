import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/administration/log/data/data_source/log_info_remote_data_source.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_info_model.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_info_repository.dart';

class LogInfoRepositoryImpl extends BaseRepository implements LogInfoRepository {
  final LogInfoRemoteDataSource remoteDataSource;

  LogInfoRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<LogInfoModel>>> getLogInfo(String name) async {
    return performOperationAndMapToResult<LogInfoModel>(
      remoteOperation: () async {
        return performNetworkOperation<LogInfoModel>(() async {
          final formData = await remoteDataSource.getLogInfo(name);
          return formData;
        });
      },
    );
  }
}
