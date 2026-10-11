import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class ConfigRepository {
  Future<Either<Failure, void>> setConfig(ConfigModel model);
  Future<Either<Failure, Result<ConfigModel>>> getConfig();
  ConfigModel getCachedConfig();
}
