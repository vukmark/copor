import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:copor_core/src/modules/simple_list/data/data_source/simple_list_remote_data_source.dart';
import 'package:copor_core/src/modules/simple_list/data/repository/simple_list_repository.dart';
import 'package:copor_core/src/modules/simple_list/data/repository/simple_list_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerLazySingletonBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<SimpleListRemoteDataSource>(
    () => SimpleListRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<SimpleListRepository>(
    () => SimpleListRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<SimpleListRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerLazySingletonBlocs() {
  getIt.registerLazySingleton<CountrySimpleListBloc>(
    () => CountrySimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<TenantSimpleListBloc>(
    () => TenantSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<BaseTenantSimpleListBloc>(
    () => BaseTenantSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<RegionSimpleListBloc>(
    () => RegionSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<RegionCitySimpleListBloc>(
    () => RegionCitySimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<StateSimpleListBloc>(
    () => StateSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<UserSimpleListBloc>(
    () => UserSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<RoleSimpleListBloc>(
    () => RoleSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
  getIt.registerLazySingleton<NativeLanguageSimpleListBloc>(
    () => NativeLanguageSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
  );
}
