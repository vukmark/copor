import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_status_cubit.dart';
import 'package:copor_core/src/modules/login/registration/data/data_source/registration_remote_data_source.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/registration_repository.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/registration_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

// TranslationBloc<RegistrationPageTranslation> is registered by tenant_activation DI.
Future<void> init() async {
  getIt.registerLazySingleton<RegistrationRemoteDataSource>(
    () => RegistrationRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<RegistrationRepository>(
    () => RegistrationRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
      remoteDataSource: getIt<RegistrationRemoteDataSource>(),
    ),
  );
  getIt.registerFactory<RegistrationBloc>(
    () => RegistrationBloc(repository: getIt<RegistrationRepository>()),
  );
  getIt.registerFactory<RegistrationStatusCubit>(
    () => RegistrationStatusCubit(repository: getIt<RegistrationRepository>()),
  );
}
