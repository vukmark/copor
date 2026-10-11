import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class FilterRepository {
  Future<Either<Failure, Result<List<FilterModel>>>> getFilters(String path);
}
