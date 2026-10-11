import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/data/data_source/copor_form_remote_data_source.dart';
import 'package:copor_core/src/modules/forms/data/repository/copor_form_repository.dart';
import 'package:copor_core/src/modules/forms/data/repository/copor_form_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<CoporFormRemoteDataSource>(
    () => CoporFormRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<CoporFormRepository>(
    () => CoporFormRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<CoporFormRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<CoporFormBloc>(
    () => CoporFormBloc(coporFormRepository: getIt<CoporFormRepository>()),
  );
}
