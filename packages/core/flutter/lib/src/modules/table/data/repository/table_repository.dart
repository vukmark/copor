import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';

abstract class TableRepository {
  Future<Either<Failure, Result<CoporTableModel>>> getTable(String listType, FilterListDTO filter);
  Future<Either<Failure, Result<void>>> deleteRow(String serverPath);
  Future<Either<Failure, Result<void>>> toggleRow(String serverPath, bool isActive);
}

abstract class TableLocalDataSource {
  Future<CoporTableModel> getTable();
}

abstract class TableRemoteDataSource {
  Future<CoporTableModel> getTable(String listType, FilterListDTO filter);
  Future<void> deleteRow(String serverPath);
  Future<void> toggleRow(String serverPath, Map<String, bool> body);
}
