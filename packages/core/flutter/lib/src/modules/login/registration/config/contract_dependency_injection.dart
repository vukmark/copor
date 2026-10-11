import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_bloc.dart';
import 'package:copor_core/src/modules/login/registration/data/data_source/contract/contract_remote_data_source.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/contract/contract_repository.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/contract/contract_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<ContractRemoteDataSource>(
    () => ContractRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<ContractRepository>(
    () => ContractRepositoryImpl(
      remoteDataSource: getIt<ContractRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<ContractBloc>(
    () => ContractBloc(contractRepository: getIt<ContractRepository>()),
  );
}
