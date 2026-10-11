import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/data/data_source/preferences_local_source.dart';
import 'package:copor_core/src/modules/preferences/data/data_source/preferences_remote_source.dart';
import 'package:copor_core/src/modules/preferences/data/repository/preference_repository.dart';
import 'package:copor_core/src/modules/preferences/data/repository/preferences_repository_impl.dart';
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
  getIt.registerLazySingleton<PreferencesLocalDataSource>(
    () => PreferencesLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<PreferencesRemoteDataSource>(
    () => PreferencesRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<PreferencesRepository>(
    () => PreferencesRepositoryImpl(
      localDataSource: getIt<PreferencesLocalDataSource>(),
      remoteDataSource: getIt<PreferencesRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<PreferencesBloc>(
    () => PreferencesBloc(preferencesRepository: getIt<PreferencesRepository>()),
  );
}
