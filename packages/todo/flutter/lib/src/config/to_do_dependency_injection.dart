import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_bloc.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_bloc.dart';
import 'package:copor_todo/src/logic/todo_attachment/todo_attachment_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/data/data_source/todo_local_source.dart';
import 'package:copor_todo/src/data/data_source/todo_remote_source.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:copor_todo/src/data/repository/todo_repository_impl.dart';
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
  getIt.registerLazySingleton<TodoLocalDataSource>(
    () => TodoLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<TodoRemoteDataSource>(() => TodoRemoteDataSourceImpl(getIt<Dio>()));
}

void registerRepositories() {
  getIt.registerLazySingleton<TodoRepository>(
    () => TodoRepositoryImpl(
      localDataSource: getIt<TodoLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<TodoRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<AllTagsForUserBloc>(() => AllTagsForUserBloc(tagRepository: getIt<TagRepository>()));
  getIt.registerFactory<TodoListBloc>(() => TodoListBloc(todoRepository: getIt<TodoRepository>()));
  getIt.registerFactory<TranslationBloc<TodoPageTranslation>>(
    () =>
        TranslationBloc<TodoPageTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
  getIt.registerFactory<TodoFormBloc>(() => TodoFormBloc(todoRepository: getIt<TodoRepository>()));
  getIt.registerFactory<TodoAttachmentCubit>(
    () => TodoAttachmentCubit(todoRepository: getIt<TodoRepository>()),
  );
}
