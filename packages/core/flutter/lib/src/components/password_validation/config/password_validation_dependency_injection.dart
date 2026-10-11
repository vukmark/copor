import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/data/data_source/password_validation_remote_data_source.dart';
import 'package:copor_core/src/components/password_validation/data/repository/password_validation_repository.dart';
import 'package:copor_core/src/components/password_validation/data/repository/password_validation_repository_impl.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<PasswordValidationRemoteDataSource>(
    () => PasswordValidationRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<PasswordValidationRepository>(
    () => PasswordValidationRepositoryImpl(
      remoteDataSource: getIt<PasswordValidationRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<PasswordValidationBloc>(
    () =>
        PasswordValidationBloc(passwordValidationRepository: getIt<PasswordValidationRepository>()),
  );
}
