import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_cubit.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/user_permissions_view/user_permissions_view_cubit.dart';
import 'package:copor_core/src/modules/administration/permissions/data/data_source/permissions_remote_source.dart';
import 'package:copor_core/src/modules/administration/permissions/data/repository/permissions_repository.dart';
import 'package:copor_core/src/modules/administration/permissions/data/repository/permissions_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<PermissionsRemoteDataSource>(
    () => PermissionsRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<PermissionsRepository>(
    () => PermissionsRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<PermissionsRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<PermissionsListCubit>(
    () => PermissionsListCubit(
      permissionsRepository: getIt<PermissionsRepository>(),
      sharedPreferences: getIt<SharedPreferences>(),
    ),
  );
  getIt.registerFactory<UserPermissionsViewCubit>(
    () => UserPermissionsViewCubit(permissionsRepository: getIt<PermissionsRepository>()),
  );
}
