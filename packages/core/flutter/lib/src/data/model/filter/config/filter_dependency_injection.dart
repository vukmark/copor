import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/data/data_source/filter_remote_data_source.dart';
import 'package:copor_core/src/data/model/filter/repository/filter_repository.dart';
import 'package:copor_core/src/data/model/filter/repository/filter_repository_impl.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  if (!getIt.isRegistered<FilterRepository>()) {
    _registerRemoteDataSources();
    _registerRepositories();
    _registerFactoryBlocs();
  }
}

void _registerRemoteDataSources() {
  getIt.registerLazySingleton<FilterRemoteDataSource>(
    () => FilterRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void _registerRepositories() {
  getIt.registerLazySingleton<FilterRepository>(
    () => FilterRepositoryImpl(
      remoteDataSource: getIt<FilterRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void _registerFactoryBlocs() {
  getIt.registerFactory<FilterBloc>(() => FilterBloc(filterRepository: getIt<FilterRepository>()));
}
