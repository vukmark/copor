import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/modules/table/data/repository/table_repository.dart';

class TableRepositoryImpl extends BaseRepository implements TableRepository {
  final TableRemoteDataSource remoteDataSource;
  final TableLocalDataSource localDataSource;

  TableRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<CoporTableModel>>> getTable(
    String listType,
    FilterListDTO filter,
  ) async {
    return performOperationAndMapToResult<CoporTableModel>(
      localOperation: () async {
        return performLocalStorageOperation<CoporTableModel>(() async {
          final localTable = await localDataSource.getTable();
          return localTable;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<CoporTableModel>(() async {
          final table = await remoteDataSource.getTable(listType, filter);
          return table;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteRow(String serverPath) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteRow(serverPath);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> toggleRow(String serverPath, bool isActive) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.toggleRow(serverPath, {'isActive': isActive});
        });
      },
    );
  }
}
