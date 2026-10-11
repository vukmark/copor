import 'package:dartz/dartz.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/modules/administration/language/data/repository/language_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class LanguageRepositoryImpl extends BaseRepository implements LanguageRepository {
  final LanguageRemoteDataSource remoteDataSource;
  final LanguageLocalDataSource localDataSource;

  LanguageRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<LanguageModel>>> getLanguage(String id) async {
    return performOperationAndMapToResult<LanguageModel>(
      localOperation: () async {
        return performLocalStorageOperation<LanguageModel>(() async {
          final languageModelList = await localDataSource.getLanguageList();

          return languageModelList.firstWhere(
            (lang) => lang.id == id,
            orElse: () => throw Failure(-0, 'Language not found'),
          );
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<LanguageModel>>>> getLanguageList() async {
    return performOperationAndMapToResult<List<LanguageModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<LanguageModel>>(
          () => localDataSource.getLanguageList(),
        );
      },
      remoteOperation: () async {
        return performNetworkOperation<List<LanguageModel>>(() async {
          final languageList = await remoteDataSource.getLanguageList();

          await localDataSource.setLanguageList(languageList);

          return languageList;
        });
      },
    );
  }
}

abstract class LanguageRemoteDataSource {
  Future<List<LanguageModel>> getLanguageList();
}

abstract class LanguageLocalDataSource {
  Future<List<LanguageModel>> getLanguageList();
  Future<void> setLanguageList(List<LanguageModel> languageModelList);
}
