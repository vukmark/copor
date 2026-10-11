import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_bloc.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_form/user_form_bloc.dart';
import 'package:copor_core/src/modules/administration/user/data/data_source/user_local_source.dart';
import 'package:copor_core/src/modules/administration/user/data/data_source/user_remote_source.dart';
import 'package:copor_core/src/modules/administration/user/data/model/translation/user_translation.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository_impl.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository.dart';
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
  getIt.registerLazySingleton<UserLocalDataSource>(
    () => UserLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<UserRemoteDataSource>(() => UserRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      localDataSource: getIt<UserLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<UserRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<UserPageTranslation>>(
    () =>
        TranslationBloc<UserPageTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
  getIt.registerFactory<UserListBloc>(() => UserListBloc(userRepository: getIt<UserRepository>()));
  getIt.registerFactory<UserFormBloc>(() => UserFormBloc(userRepository: getIt<UserRepository>()));
}
