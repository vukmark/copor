import 'package:copor_cloud/src/config/cloud_module.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/data/datasource/drive_remote_datasource.dart';
import 'package:copor_cloud/src/data/datasource/drive_remote_datasource_impl.dart';
import 'package:copor_cloud/src/data/repository/drive_repository_impl.dart';
import 'package:copor_cloud/src/data/repository/drive_repository.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerRemoteDataSources();
  registerRepositories();
  registerLazySingletonBlocs();
  registerFactoryBlocs();
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<DriveRemoteDataSource>(() => DriveRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<DriveRepository>(
    () => DriveRepositoryImpl(remoteDataSource: getIt<DriveRemoteDataSource>()),
  );
}

void registerLazySingletonBlocs() {
  getIt.registerLazySingleton<DrivePageCubit>(
    () => DrivePageCubit(
      driveRepository: getIt<DriveRepository>(),
      mediaRepository: getIt<MediaRepository>(),
      maxFileSize: getIt<PreferencesBloc>().state.result?.data.moduleMaxFileSize(CloudModule.moduleName) ?? 1,
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<CloudPageTranslation>>(
    () => TranslationBloc<CloudPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
}
