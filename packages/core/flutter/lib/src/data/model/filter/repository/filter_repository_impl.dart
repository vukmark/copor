import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/data_source/filter_remote_data_source.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_core/src/data/model/filter/repository/filter_repository.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class FilterRepositoryImpl extends BaseRepository implements FilterRepository {
  final FilterRemoteDataSource remoteDataSource;

  FilterRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<FilterModel>>>> getFilters(String path) async {
    return performOperationAndMapToResult<List<FilterModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<FilterModel>>(() async {
          final filterList = await remoteDataSource.getFilters(path);
          return filterList;
        });
      },
    );
  }
}
