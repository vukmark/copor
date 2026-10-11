import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/region_city/bloc/region_city_list/region_city_list_bloc.dart';
import 'package:copor_core/src/modules/administration/region_city/data/data_source/region_city_remote_source.dart';
import 'package:copor_core/src/modules/administration/region_city/data/repository/region_city_repository.dart';
import 'package:copor_core/src/modules/administration/region_city/data/repository/region_city_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<RegionCityRemoteDataSource>(
    () => RegionCityRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<RegionCityRepository>(
    () => RegionCityRepositoryImpl(
      remoteDataSource: getIt<RegionCityRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<RegionCityListBloc>(
    () => RegionCityListBloc(regionCityRepository: getIt<RegionCityRepository>()),
  );
}
