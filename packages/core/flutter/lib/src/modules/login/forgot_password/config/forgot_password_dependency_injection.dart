import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_bloc.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/data_source/forgot_password_remote_data_source.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/repository/forgot_password_repository.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/repository/forgot_password_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<ForgotPasswordRemoteDataSource>(
    () => ForgotPasswordRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<ForgotPasswordRepository>(
    () => ForgotPasswordRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<ForgotPasswordRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<ForgotPasswordBloc>(
    () => ForgotPasswordBloc(repository: getIt<ForgotPasswordRepository>()),
  );
}
