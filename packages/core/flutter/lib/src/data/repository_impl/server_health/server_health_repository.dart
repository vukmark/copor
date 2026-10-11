import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/server_health/server_health_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class ServerHealthRepository {
  Future<Either<Failure, Result<ServerHealthModel>>> pingClient(String baseURL);
}
