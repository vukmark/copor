import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_info_model.dart';

abstract class LogInfoRepository {
  Future<Either<Failure, Result<LogInfoModel>>> getLogInfo(String name);
}
