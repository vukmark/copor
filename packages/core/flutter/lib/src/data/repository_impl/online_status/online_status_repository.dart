import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class OnlineStatusRepository {
  Future<Either<Failure, Result<List<String>>>> getOnlineUserIds();
}
