import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/data_source/feature_local_source.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/data_source/feature_remote_source.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/repository/feature_repository_impl.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  if (!getIt.isRegistered<FeatureRepository>()) {
    _registerLocalDataSources();
    _registerRemoteDataSources();
    _registerRepositories();
    _registerSingletonBlocs();
    _registerFactoryBlocs();
  }
}

void _registerLocalDataSources() {
  getIt.registerLazySingleton<FeatureLocalDataSource>(
    () => FeatureLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void _registerRemoteDataSources() {
  getIt.registerLazySingleton<FeatureRemoteDataSource>(
    () => FeatureRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void _registerRepositories() {
  getIt.registerLazySingleton<FeatureRepository>(
    () => FeatureRepositoryImpl(
      remoteDataSource: getIt<FeatureRemoteDataSource>(),
      localDataSource: getIt<FeatureLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void _registerSingletonBlocs() {
  getIt.registerLazySingleton<FeatureAccessBloc>(
    () => FeatureAccessBloc(featureRepository: getIt<FeatureRepository>()),
  );
  getIt.registerLazySingleton<MenuBloc>(
    () => MenuBloc(featureRepository: getIt<FeatureRepository>()),
  );
}

void _registerFactoryBlocs() {
  getIt.registerFactory<FeatureAdminBloc>(
    () => FeatureAdminBloc(featureRepository: getIt<FeatureRepository>()),
  );
}
