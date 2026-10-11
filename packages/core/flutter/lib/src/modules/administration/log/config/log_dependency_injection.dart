import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_bloc.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_list/log_list_bloc.dart';
import 'package:copor_core/src/modules/administration/log/data/data_source/log_info_remote_data_source.dart';
import 'package:copor_core/src/modules/administration/log/data/data_source/log_local_source.dart';
import 'package:copor_core/src/modules/administration/log/data/data_source/log_remote_source.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_translation.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_type_translation.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_info_repository.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_info_repository_impl.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_repository.dart';
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
  getIt.registerLazySingleton<LogLocalDataSource>(
    () => LogLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<LogRemoteDataSource>(() => LogRemoteDataSourceImpl(getIt<Dio>()));
  getIt.registerLazySingleton<LogInfoRemoteDataSource>(
    () => LogInfoRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<LogInfoRepository>(
    () => LogInfoRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<LogInfoRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<LogPageTranslation>>(
    () =>
        TranslationBloc<LogPageTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
  getIt.registerFactory<LogListBloc>(() => LogListBloc(logRepository: getIt<LogRepository>()));
  getIt.registerFactory<TranslationBloc<LogTypeTranslation>>(
    () =>
        TranslationBloc<LogTypeTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
  getIt.registerFactory<LogInfoBloc>(
    () => LogInfoBloc(logInfoRepository: getIt<LogInfoRepository>()),
  );
}
