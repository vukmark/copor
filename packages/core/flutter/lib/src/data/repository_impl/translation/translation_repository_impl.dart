import 'package:dartz/dartz.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class TranslationRemoteDataSource {
  Future<TranslationModel?> getTranslation(String namespace, String languageCode);
  Future<void> updateTranslation(TranslationModel translationModel, String languageCode);
}

abstract class TranslationLocalDataSource {
  Future<TranslationModel> getTranslation(String namespace, String languageCode);
  Future<void> saveTranslation(TranslationModel translationModel, String languageCode);
}

class TranslationRepositoryImpl extends BaseRepository implements TranslationRepository {
  final TranslationRemoteDataSource remoteDataSource;
  final TranslationLocalDataSource localDataSource;

  TranslationRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<T>>> getTranslation<T extends TranslationModel>(
    String modelNamespace,
    LanguageModel languageModel,
    TranslationConstructor<T> constructor,
  ) async {
    final languageCode = languageModel.code.toLowerCase();
    return performOperationAndMapToResult<T>(
      localOperation: () async {
        return performLocalStorageOperation<T>(() async {
          final TranslationModel translationModel = await localDataSource.getTranslation(
            modelNamespace,
            languageCode,
          );
          final T nameSpaceTranslationModel = translationModel.toNamespaceModel(constructor);
          return nameSpaceTranslationModel;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<T>(() async {
          final translationModel = await remoteDataSource.getTranslation(
            modelNamespace,
            languageCode,
          );
          if (translationModel == null) {
            throw CacheNotFoundException(modelNamespace, languageCode);
          }
          final T nameSpaceTranslationModel = translationModel.toNamespaceModel(constructor);
          await localDataSource.saveTranslation(nameSpaceTranslationModel, languageCode);
          return nameSpaceTranslationModel;
        });
      },
    );
  }

  @override
  Future<Either<Failure, void>> updateTranslation<T extends TranslationModel>(
    T updatedTranslationModel,
    LanguageModel languageModel,
  ) async {
    final languageCode = languageModel.code.toLowerCase();
    return performVoidOperation(
      remoteOperation: () async {
        return await performNetworkOperation<void>(() async {
          await remoteDataSource.updateTranslation(updatedTranslationModel, languageCode);
          await localDataSource.saveTranslation(updatedTranslationModel, languageCode);
        });
      },
    );
  }
}
