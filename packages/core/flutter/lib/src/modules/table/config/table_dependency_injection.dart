import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/table/bloc/table_bloc.dart';
import 'package:copor_core/src/modules/table/data/data_source/table_local_source.dart';
import 'package:copor_core/src/modules/table/data/data_source/table_remote_source.dart';
import 'package:copor_core/src/modules/table/data/repository/table_repository.dart';
import 'package:copor_core/src/modules/table/data/repository/table_repository_impl.dart';
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
  getIt.registerLazySingleton<TableLocalDataSource>(
    () => TableLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<TableRemoteDataSource>(() => TableRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<TableRepository>(
    () => TableRepositoryImpl(
      localDataSource: getIt<TableLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<TableRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TableBloc>(() => TableBloc(tableRepository: getIt<TableRepository>()));
}
