import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/modules/administration/language/data/data_source/language_local_data_source.dart';
import 'package:copor_core/src/modules/administration/language/data/data_source/language_remote_data_source.dart';
import 'package:copor_core/src/modules/administration/language/data/model/translation/language_translation.dart';
import 'package:copor_core/src/modules/administration/language/data/repository/language_repository.dart';
import 'package:copor_core/src/modules/administration/language/data/repository/language_repository_impl.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

import 'package:shared_preferences/shared_preferences.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerLocalDataSources();
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerLocalDataSources() {
  getIt.registerLazySingleton<LanguageLocalDataSource>(
    () => LanguageLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<LanguageRemoteDataSource>(
    () => LanguageRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<LanguageRepository>(
    () => LanguageRepositoryImpl(
      localDataSource: getIt<LanguageLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<LanguageRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<LanguageBloc>(() => LanguageBloc());

  getIt.registerFactory<TranslationBloc<LanguagePageTranslation>>(
    () => TranslationBloc<LanguagePageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
}
