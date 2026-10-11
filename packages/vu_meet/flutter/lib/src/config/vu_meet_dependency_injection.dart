import 'package:copor_vu_meet/src/config/vu_meet_module.dart';
import 'package:copor_vu_meet/src/config/callkit_service.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/media_picker/data/datasource/camera_datasource.dart';
import 'package:copor_core/src/modules/media_picker/data/datasource/file_datasource.dart';
import 'package:copor_core/src/modules/media_picker/data/datasource/gallery_datasource.dart';
import 'package:copor_core/src/modules/media_picker/data/repositories/media_repository_impl.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_cubit.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_bloc.dart';
import 'package:copor_vu_meet/src/data/data_source/call/call_local_source.dart';
import 'package:copor_vu_meet/src/data/data_source/call/call_remote_source.dart';
import 'package:copor_vu_meet/src/data/data_source/chat_info/chat_info_remote_source.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/data/repository_impl/call/call_repository.dart';
import 'package:copor_vu_meet/src/data/repository_impl/call/call_repository_impl.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_info/chat_info_repository.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_info/chat_info_repository_impl.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/route_cubit.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/declined_calls_cubit.dart';
import 'package:copor_vu_meet/src/logic/call/group_call_roster_cubit.dart';
import 'package:copor_vu_meet/src/logic/chat/add_members/edit_group_cubit.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/logic/message/private_message_list/private_message_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

// DO NOT DELETE WORDS STARTING WITH GENERATE_

//GENERATE_IMPORT_REPOSITORY
import 'package:copor_vu_meet/src/data/repository_impl/vu_meet_message/vu_meet_message_repository.dart';
import 'package:copor_vu_meet/src/data/repository_impl/private_message_list/private_message_list_repository.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_list/chat_list_repository.dart';

//GENERATE_IMPORT_REPO_IMPL
import 'package:copor_vu_meet/src/data/repository_impl/vu_meet_message/vu_meet_message_repository_impl.dart';
import 'package:copor_vu_meet/src/data/repository_impl/private_message_list/private_message_list_repository_impl.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_list/chat_list_repository_impl.dart';

//GENERATE_IMPORT_LOCAL_SOURCE
import 'package:copor_vu_meet/src/data/data_source/vu_meet_message/vu_meet_message_local_source.dart';
import 'package:copor_vu_meet/src/data/data_source/private_message_list/private_message_list_local_source.dart';
import 'package:copor_vu_meet/src/data/data_source/chat_list/chat_list_local_source.dart';

//GENERATE_IMPORT_REMOTE_SOURCE
import 'package:copor_vu_meet/src/data/data_source/vu_meet_message/vu_meet_message_remote_source.dart';
import 'package:copor_vu_meet/src/data/data_source/private_message_list/private_message_list_remote_source.dart';
import 'package:copor_vu_meet/src/data/data_source/chat_list/chat_list_remote_source.dart';

//GENERATE_IMPORT_BLOC

// DO NOT FORGET to register this in frontend/lib/src/config/dependency_injection.dart
// See how vuMeet was registered as example

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerLocalDataSources();
  registerRemoteDataSources();
  registerRepositories();
  registerSingletonBlocs();
  registerFactoryBlocs();
  getIt.registerLazySingleton<CallKitService>(() => CallKitService());
}

void registerLocalDataSources() {
  //GENERATE_REGISTER_LOCAL_SOURCE
  getIt.registerLazySingleton<VuMeetMessageLocalDataSource>(
    () => VuMeetMessageLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
  getIt.registerLazySingleton<PrivateMessageListLocalDataSource>(
    () => PrivateMessageListLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
  getIt.registerLazySingleton<ChatListLocalDataSource>(
    () => ChatListLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
  getIt.registerLazySingleton<CallLocalDataSource>(() => CallLocalDataSourceImpl());
  getIt.registerLazySingleton<CameraDatasource>(() => CameraDatasource());
  getIt.registerLazySingleton<FileDatasource>(() => FileDatasource());
  getIt.registerLazySingleton<GalleryDatasource>(() => GalleryDatasource());
}

void registerRemoteDataSources() {
  //GENERATE_REGISTER_REMOTE_SOURCE
  getIt.registerLazySingleton<VuMeetMessageRemoteDataSource>(
    () => VuMeetMessageRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<PrivateMessageListRemoteDataSource>(
    () => PrivateMessageListRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<ChatListRemoteDataSource>(
    () => ChatListRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<CallRemoteDataSource>(() => CallRemoteDataSourceImpl(getIt<Dio>()));
  getIt.registerLazySingleton<ChatInfoRemoteDataSource>(
    () => ChatInfoRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  //GENERATE_REGISTER_REPOSITORIES
  getIt.registerLazySingleton<VuMeetMessageRepository>(
    () => VuMeetMessageRepositoryImpl(
      localDataSource: getIt<VuMeetMessageLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<VuMeetMessageRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<PrivateMessageListRepository>(
    () => PrivateMessageListRepositoryImpl(
      localDataSource: getIt<PrivateMessageListLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<PrivateMessageListRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<ChatListRepository>(
    () => ChatListRepositoryImpl(
      localDataSource: getIt<ChatListLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<ChatListRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<CallRepository>(
    () => CallRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<CallRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<ChatInfoRepository>(
    () => ChatInfoRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<ChatInfoRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<MediaRepository>(
    () => MediaRepositoryImpl(
      galleryDatasource: getIt<GalleryDatasource>(),
      cameraDatasource: getIt<CameraDatasource>(),
      fileDatasource: getIt<FileDatasource>(),
    ),
  );
}

void registerSingletonBlocs() {
  //GENERATE_REGISTER_BLOC
  getIt.registerLazySingleton<VuMeetMessageBloc>(
    () => VuMeetMessageBloc(vuMeetMessageRepository: getIt<VuMeetMessageRepository>()),
  );
  getIt.registerLazySingleton<PrivateMessageListBloc>(
    () =>
        PrivateMessageListBloc(privateMessageListRepository: getIt<PrivateMessageListRepository>()),
  );
  getIt.registerLazySingleton<ChatListBloc>(
    () => ChatListBloc(chatListRepository: getIt<ChatListRepository>()),
  );
  getIt.registerLazySingleton<CallBloc>(
    () => CallBloc(
      callRepository: getIt<CallRepository>(),
      activeCallStore: getIt<CallLocalDataSource>(),
    ),
  );
  getIt.registerLazySingleton<SelectedChatCubit>(
    () => SelectedChatCubit(routeCubit: getIt<RouteCubit>()),
  );
  getIt.registerLazySingleton<DeclinedCallsCubit>(() => DeclinedCallsCubit());
  getIt.registerLazySingleton<GroupCallRosterCubit>(
    () => GroupCallRosterCubit(webSocketBloc: getIt<WebSocketBloc>()),
  );
  getIt.registerLazySingleton<ChatInfoBloc>(
    () => ChatInfoBloc(chatInfoRepository: getIt<ChatInfoRepository>()),
  );
  getIt.registerLazySingleton<VuMeetUiBloc>(() => VuMeetUiBloc());
  getIt.registerLazySingleton<MediaPickerCubit>(
    () => MediaPickerCubit(
      mediaRepository: getIt<MediaRepository>(),
      maxFileSize: getIt<PreferencesBloc>().state.result?.data.moduleMaxFileSize(VuMeetModule.moduleName) ?? 1,
    ),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<VuMeetPageTranslation>>(
    () => TranslationBloc<VuMeetPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
  getIt.registerFactory<VuMeetMediaMessageBloc>(
    () => VuMeetMediaMessageBloc(vuMeetMessageRepository: getIt<VuMeetMessageRepository>()),
  );
  getIt.registerFactory<EditGroupCubit>(() => EditGroupCubit());
}
