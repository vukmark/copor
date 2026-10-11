import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/data/data_source/tag_local_source.dart';
import 'package:copor_core/src/modules/administration/tag/data/data_source/tag_remote_source.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/translation/tag_translation.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository_impl.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerLocalDataSources();
  registerRemoteDataSources();
  registerRepositories();
  registerFactoryBlocs();
}

void registerLocalDataSources() {
  getIt.registerLazySingleton<TagLocalDataSource>(
    () => TagLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<TagRemoteDataSource>(() => TagRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<TagRepository>(
    () => TagRepositoryImpl(
      localDataSource: getIt<TagLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<TagRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<TagPageTranslation>>(
    () =>
        TranslationBloc<TagPageTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
  getIt.registerFactory<TagListBloc>(() => TagListBloc(tagRepository: getIt<TagRepository>()));
  getIt.registerFactory<TagFormBloc>(() => TagFormBloc(tagRepository: getIt<TagRepository>()));
  getIt.registerFactory<PrivateTagListBloc>(
    () => PrivateTagListBloc(tagRepository: getIt<TagRepository>()),
  );
  getIt.registerFactory<PrivateTagFormBloc>(
    () => PrivateTagFormBloc(tagRepository: getIt<TagRepository>()),
  );
}
