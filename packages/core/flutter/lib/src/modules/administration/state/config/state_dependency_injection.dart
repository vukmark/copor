import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/state/bloc/state_list/state_list_bloc.dart';
import 'package:copor_core/src/modules/administration/state/bloc/state_form/state_form_bloc.dart';
import 'package:copor_core/src/modules/administration/state/data/data_source/state_local_source.dart';
import 'package:copor_core/src/modules/administration/state/data/data_source/state_remote_source.dart';
import 'package:copor_core/src/modules/administration/state/data/model/translation/state_translation.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository.dart';
import 'package:copor_core/src/modules/administration/state/data/repository/state_repository_impl.dart';
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
  getIt.registerLazySingleton<StateLocalDataSource>(
    () => StateLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<StateRemoteDataSource>(() => StateRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<StateRepository>(
    () => StateRepositoryImpl(
      localDataSource: getIt<StateLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<StateRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<StatePageTranslation>>(
    () => TranslationBloc<StatePageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
  getIt.registerFactory<StateListBloc>(
    () => StateListBloc(stateRepository: getIt<StateRepository>()),
  );
  getIt.registerFactory<StateFormBloc>(
    () => StateFormBloc(stateRepository: getIt<StateRepository>()),
  );
}
