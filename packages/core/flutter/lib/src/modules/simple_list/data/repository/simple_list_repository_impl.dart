import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/simple_list/data/data_source/simple_list_remote_data_source.dart';
import 'package:copor_core/src/modules/simple_list/data/model/simple_list_model.dart';
import 'package:copor_core/src/modules/simple_list/data/repository/simple_list_repository.dart';

class SimpleListRepositoryImpl extends BaseRepository implements SimpleListRepository {
  final SimpleListRemoteDataSource remoteDataSource;

  SimpleListRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<SimpleListModel>>> getSimpleList(
    String type,
    FilterListDTO filterList,
  ) async {
    return performOperationAndMapToResult<SimpleListModel>(
      remoteOperation: () async {
        return performNetworkOperation<SimpleListModel>(() async {
          final simpleList = await remoteDataSource.getSimpleList(type, filterList);
          return simpleList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<SimpleListModel>>> getStateSimpleList(String countryId) {
    return performOperationAndMapToResult<SimpleListModel>(
      remoteOperation: () async {
        return performNetworkOperation<SimpleListModel>(() async {
          final simpleList = await remoteDataSource.getStateSimpleList(
            countryId,
            FilterListDTO.empty(),
          );
          return simpleList;
        });
      },
    );
  }
}
