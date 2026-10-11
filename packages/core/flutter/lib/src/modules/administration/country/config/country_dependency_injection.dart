import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_bloc.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_form/country_form_bloc.dart';
import 'package:copor_core/src/modules/administration/country/data/data_source/country_local_source.dart';
import 'package:copor_core/src/modules/administration/country/data/data_source/country_remote_source.dart';
import 'package:copor_core/src/modules/administration/country/data/model/translation/country_translation.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository_impl.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
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
  getIt.registerLazySingleton<CountryLocalDataSource>(
    () => CountryLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<CountryRemoteDataSource>(
    () => CountryRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<CountryRepository>(
    () => CountryRepositoryImpl(
      localDataSource: getIt<CountryLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<CountryRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<CountryPageTranslation>>(
    () => TranslationBloc<CountryPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
  getIt.registerFactory<CountryListBloc>(
    () => CountryListBloc(countryRepository: getIt<CountryRepository>()),
  );
  getIt.registerFactory<CountryFormBloc>(
    () => CountryFormBloc(countryRepository: getIt<CountryRepository>()),
  );
}
