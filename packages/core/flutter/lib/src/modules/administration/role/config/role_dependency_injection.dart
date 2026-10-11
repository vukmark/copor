import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/role/bloc/role_form/role_form_bloc.dart';
import 'package:copor_core/src/modules/administration/role/data/model/translation/role_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:copor_core/src/modules/administration/role/bloc/role_list/role_list_bloc.dart';
import 'package:copor_core/src/modules/administration/role/data/data_source/role_local_source.dart';
import 'package:copor_core/src/modules/administration/role/data/data_source/role_remote_source.dart';
import 'package:copor_core/src/modules/administration/role/data/repository/role_repository.dart';
import 'package:copor_core/src/modules/administration/role/data/repository/role_repository_impl.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerLocalDataSources();
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerLocalDataSources() {
  getIt.registerLazySingleton<RoleLocalDataSource>(
    () => RoleLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<RoleRemoteDataSource>(() => RoleRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<RoleRepository>(
    () => RoleRepositoryImpl(
      localDataSource: getIt<RoleLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<RoleRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<RoleFormBloc>(() => RoleFormBloc(roleRepository: getIt<RoleRepository>()));

  getIt.registerFactory<RoleListBloc>(() => RoleListBloc(roleRepository: getIt<RoleRepository>()));

  getIt.registerFactory<TranslationBloc<RolePageTranslation>>(
    () =>
        TranslationBloc<RolePageTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
}
