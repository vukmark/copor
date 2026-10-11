import 'package:dartz/dartz.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class LanguageRepository {
  Future<Either<Failure, Result<List<LanguageModel>>>> getLanguageList();
  Future<Either<Failure, Result<LanguageModel>>> getLanguage(String id);
}
