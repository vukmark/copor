import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class LogRepository {
  Future<Either<Failure, Result<List<LogModel>>>> getLogList();
}

abstract class LogLocalDataSource {
  Future<List<LogModel>> getLogList();
  Future<void> setLogList(List<LogModel> logList);
}

abstract class LogRemoteDataSource {
  Future<List<LogModel>> getLogList();
}
