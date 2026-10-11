import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_cubit.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/data_source/user_groups_remote_source.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/repository/user_groups_repository.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/repository/user_groups_repository_impl.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<UserGroupsRemoteDataSource>(
    () => UserGroupsRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<UserGroupsRepository>(
    () => UserGroupsRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<UserGroupsRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<UserGroupsCubit>(
    () => UserGroupsCubit(userGroupsRepository: getIt<UserGroupsRepository>()),
  );
}
