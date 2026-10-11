import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/utils/push_notification/bloc/fcm_token_cubit.dart';
import 'package:copor_core/src/utils/push_notification/data_source/fcm_token_remote_source.dart';
import 'package:copor_core/src/utils/push_notification/repository_impl/fcm_token_repository.dart';
import 'package:copor_core/src/utils/push_notification/repository_impl/fcm_token_repository_impl.dart';
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
  getIt.registerLazySingleton<FcmTokenRepositoryRemoteDataSource>(
    () => FcmTokenRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  //GENERATE_REGISTER_REPOSITORIES
  getIt.registerLazySingleton<FcmTokenRepository>(
    () => FcmTokenRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<FcmTokenRepositoryRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerSingletonBlocs() {
  //GENERATE_REGISTER_BLOC
  getIt.registerFactory<FcmTokenCubit>(() => FcmTokenCubit(getIt<FcmTokenRepository>()));
}
