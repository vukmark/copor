import 'package:dartz/dartz.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class TranslationRepository {
  Future<Either<Failure, Result<T>>> getTranslation<T extends TranslationModel>(
    String modelNamespace,
    LanguageModel languageModel,
    TranslationConstructor<T> constructor,
  );
  Future<Either<Failure, void>> updateTranslation<T extends TranslationModel>(
    T updatedTranslationModel,
    LanguageModel languageModel,
  );
}
