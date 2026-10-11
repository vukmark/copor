import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_bloc.dart';
import 'package:copor_core/src/modules/deletion_requests/data/data_source/deletion_requests_remote_source.dart';
import 'package:copor_core/src/modules/deletion_requests/data/repository/deletion_requests_repository.dart';
import 'package:copor_core/src/modules/deletion_requests/data/repository/deletion_requests_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<DeletionRequestsRemoteDataSource>(
    () => DeletionRequestsRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<DeletionRequestsRepository>(
    () => DeletionRequestsRepositoryImpl(
      remoteDataSource: getIt<DeletionRequestsRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<DeletionRequestsBloc>(
    () => DeletionRequestsBloc(deletionRequestsRepository: getIt<DeletionRequestsRepository>()),
  );
}
