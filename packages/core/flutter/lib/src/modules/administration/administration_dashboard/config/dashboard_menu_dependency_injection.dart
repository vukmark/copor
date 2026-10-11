import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_bloc.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/data_source/dashboard_menu_remote_source.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/repository/dashboard_menu_repository.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/repository/dashboard_menu_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  if (!getIt.isRegistered<DashboardMenuRepository>()) {
    _registerRemoteDataSources();
    _registerRepositories();
    _registerSingletonBlocs();
  }
}

void _registerRemoteDataSources() {
  getIt.registerLazySingleton<DashboardMenuRemoteDataSource>(
    () => DashboardMenuRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void _registerRepositories() {
  getIt.registerLazySingleton<DashboardMenuRepository>(
    () => DashboardMenuRepositoryImpl(
      remoteDataSource: getIt<DashboardMenuRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void _registerSingletonBlocs() {
  getIt.registerLazySingleton<DashboardMenuBloc>(
    () => DashboardMenuBloc(dashboardMenuRepository: getIt<DashboardMenuRepository>()),
  );
}
