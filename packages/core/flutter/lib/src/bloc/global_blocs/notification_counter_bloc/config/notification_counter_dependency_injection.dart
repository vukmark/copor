import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/notification_counter_bloc.dart';
import 'package:copor_core/src/data/data_source/notification_counter/notification_counter_remote_source_impl.dart';
import 'package:copor_core/src/data/repository_impl/notification_counter/notification_counter_repository.dart';
import 'package:copor_core/src/data/repository_impl/notification_counter/notification_counter_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

// DO NOT DELETE WORDS STARTING WITH GENERATE_

//GENERATE_IMPORT_REPOSITORY
//GENERATE_IMPORT_REPO_IMPL
//GENERATE_IMPORT_LOCAL_SOURCE
//GENERATE_IMPORT_REMOTE_SOURCE
//GENERATE_IMPORT_BLOC

// DO NOT FORGET to register this in frontend/lib/src/config/dependency_injection.dart
// See how vuMeet was registered as example

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerSingletonBlocs();
}

void registerRemoteDataSources() {
  //GENERATE_REGISTER_REMOTE_SOURCE
  getIt.registerLazySingleton<NotificationCounterRemoteDataSource>(
    () => NotificationCounterRemoteSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  //GENERATE_REGISTER_REPOSITORIES
  getIt.registerLazySingleton<NotificationCounterRepository>(
    () => NotificationCounterRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<NotificationCounterRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerSingletonBlocs() {
  //GENERATE_REGISTER_BLOC
  getIt.registerLazySingleton<NotificationCounterBloc>(
    () => NotificationCounterBloc(
      notificationCounterRepository: getIt<NotificationCounterRepository>(),
    ),
  );
}
