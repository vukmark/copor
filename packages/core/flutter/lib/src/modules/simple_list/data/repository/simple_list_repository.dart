import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/simple_list/data/model/simple_list_model.dart';

abstract class SimpleListRepository {
  Future<Either<Failure, Result<SimpleListModel>>> getSimpleList(
    String type,
    FilterListDTO filterList,
  );
  Future<Either<Failure, Result<SimpleListModel>>> getStateSimpleList(String countryId);
}
