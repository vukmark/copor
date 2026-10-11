import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/components/scaffold/persistent_scaffold_cubits.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_core/src/bloc/global_blocs/connectivity_cubit/connectivity_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_history.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_bloc.dart';
import 'package:copor_core/src/bloc/utils/form_save_trigger_cubit.dart';
import 'package:copor_core/src/config/router/app_router.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/dispatcher.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/config/web_socket_service.dart';
import 'package:copor_core/src/data/data_source/authorization/authorization_local_source.dart';
import 'package:copor_core/src/data/data_source/authorization/authorization_remote_source.dart';
import 'package:copor_core/src/data/data_source/config/config_local_source.dart';
import 'package:copor_core/src/data/data_source/config/config_remote_source.dart';
import 'package:copor_core/src/data/data_source/navigation/navigation_history_local_source.dart';
import 'package:copor_core/src/data/data_source/online_status/online_status_remote_source.dart';
import 'package:copor_core/src/data/data_source/user_picker/user_picker_remote_source.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository_impl.dart';
import 'package:copor_core/src/data/data_source/server_health/server_health_remote_source.dart';
import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/data/repository_impl/server_health/server_health_repository.dart';
import 'package:copor_core/src/data/repository_impl/server_health/server_health_repository_impl.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/data/data_source/translation/translation_local_source.dart';
import 'package:copor_core/src/data/data_source/translation/translation_remote_source.dart';
import 'package:copor_core/src/data/model/asset_list/namespace_entity/login_asset_list.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/data/repository_impl/asset_list/asset_list_repository_impl.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository_impl.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository_impl.dart';
import 'package:copor_core/src/data/repository_impl/online_status/online_status_repository.dart';
import 'package:copor_core/src/data/repository_impl/online_status/online_status_repository_impl.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository_impl.dart';
import 'package:copor_core/src/data/repository_impl/asset_list/asset_list_repository.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/local_storage/shared_preferences_factory.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_bloc.dart';
import 'package:copor_core/src/network/dio_factory.dart';
import 'package:copor_core/src/network/server_url_interceptor.dart';
import 'package:copor_core/src/network/token_interceptor.dart';
import 'package:copor_core/src/network/token_refresh_service.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/route_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/online_status/online_status_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:copor_core/src/modules/administration/feature_flags/config/feature_dependency_injection.dart'
    as feature_di;
import 'package:copor_core/src/modules/my_account/config/account_dependency_injection.dart'
    as my_account_di;
import 'package:copor_core/src/modules/administration/country/config/country_dependency_injection.dart'
    as country_di;
import 'package:copor_core/src/modules/deletion_requests/config/deletion_requests_dependency_injection.dart'
    as deletion_requests_di;
import 'package:copor_core/src/modules/administration/user/config/user_dependency_injection.dart'
    as user_di;
import 'package:copor_core/src/modules/administration/user_groups/config/user_groups_dependency_injection.dart'
    as user_groups_di;
import 'package:copor_core/src/modules/administration/language/config/language_dependency_injection.dart'
    as language_di;
import 'package:copor_core/src/modules/administration/state/config/state_dependency_injection.dart'
    as state_di;
import 'package:copor_core/src/modules/administration/tag/config/tag_dependency_injection.dart'
    as tag_di;
import 'package:copor_core/src/modules/preferences/config/preferences_dependency_injection.dart'
    as preferences_di;
import 'package:copor_core/src/modules/administration/role/config/role_dependency_injection.dart'
    as role_di;
import 'package:copor_core/src/modules/administration/permissions/config/permissions_dependency_injection.dart'
    as permissions_di;
import 'package:copor_core/src/utils/push_notification/config/push_notification_dependency_injection.dart'
    as push_notification_di;
import 'package:copor_core/src/modules/login/tenant_activation/config/tenant_activation_dependency_injection.dart'
    as tenant_activation_di;
import 'package:copor_core/src/modules/administration/log/config/log_dependency_injection.dart'
    as log_di;
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/config/notification_counter_dependency_injection.dart'
    as notification_counter_di;
import 'package:copor_core/src/modules/login/registration/config/registration_dependency_injection.dart'
    as registration_di;
import 'package:copor_core/src/modules/login/registration/config/contract_dependency_injection.dart'
    as contract_di;
import 'package:copor_core/src/data/model/filter/config/filter_dependency_injection.dart'
    as filter_di;
import 'package:copor_core/src/modules/simple_list/config/simple_list_dependency_injection.dart'
    as simple_list_di;
import 'package:copor_core/src/modules/forms/config/copor_form_dependency_injection.dart'
    as copor_form_di;
import 'package:copor_core/src/modules/table/config/table_dependency_injection.dart'
    as table_di;
import 'package:copor_core/src/components/password_validation/config/password_validation_dependency_injection.dart'
    as password_validation_di;
import 'package:copor_core/src/modules/login/contract_sign/config/contract_sign_dependency_injection.dart'
    as contract_sign_di;
import 'package:copor_core/src/modules/administration/region_city/config/region_city_dependency_injection.dart'
    as region_city_di;
import 'package:copor_core/src/modules/login/forgot_password/config/forgot_password_dependency_injection.dart'
    as forgot_password_di;
import 'package:copor_core/src/modules/administration/administration_dashboard/config/dashboard_menu_dependency_injection.dart'
    as dashboard_menu_di;

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  await registerCore();
  registerLocalDataSources();
  await _seedDefaultTranslations();
  await registerNetwork();
  registerRemoteDataSources();
  registerRepositories();
  registerSingletonBlocs();
  registerFactoryBlocs();
  await registerAllModules();
}

Future<void> registerAllModules() async {
  await filter_di.init();
  await push_notification_di.init();
  await my_account_di.init();
  await country_di.init();
  await deletion_requests_di.init();
  await user_di.init();
  await user_groups_di.init();
  await language_di.init();
  await state_di.init();
  await tag_di.init();
  await preferences_di.init();
  await role_di.init();
  await permissions_di.init();
  await tenant_activation_di.init();
  await registration_di.init();
  await contract_di.init();
  await log_di.init();
  await notification_counter_di.init();
  await simple_list_di.init();
  await copor_form_di.init();
  await table_di.init();
  await feature_di.init();
  await password_validation_di.init();
  await contract_sign_di.init();
  await region_city_di.init();
  await forgot_password_di.init();
  await dashboard_menu_di.init();

  validateModules(AppModules.enabled);
  for (final module in AppModules.enabled) {
    await module.registerDependencies();
  }
}

Future<void> _seedDefaultTranslations() async {
  final localSource = getIt<TranslationLocalDataSource>();
  final defaults = [
    ('en', ServerPickerPageTranslation.defaultEnglish()),
    ('de', ServerPickerPageTranslation.defaultGerman()),
  ];
  for (final (lang, translation) in defaults) {
    try {
      await localSource.getTranslation(ServerPickerPageTranslation.namespaceStatic, lang);
    } on CacheNotFoundException {
      await localSource.saveTranslation(translation, lang);
    }
  }
}

Future<void> registerCore() async {
  getIt.registerLazySingleton<KeyGenerator>(() => KeyGeneratorImpl(currentVersion: '1.0.0'));
  final SharedPreferencesFactory sharedPreferencesFactory = SharedPreferencesFactory();
  await sharedPreferencesFactory.initialize(getIt<KeyGenerator>());
  getIt.registerLazySingleton<ErrorHandler>(() => ErrorHandlerImpl());
  getIt.registerLazySingleton<Dispatcher>(() => DispatcherImpl(router: appRouter));
  getIt.registerLazySingleton<SharedPreferences>(
    () => sharedPreferencesFactory.getSharedPreferences(),
  );
}

void registerLocalDataSources() {
  getIt.registerLazySingleton<TranslationLocalDataSource>(
    () => TranslationLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
  getIt.registerLazySingleton<ConfigLocalDataSource>(
    () => ConfigLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
  getIt.registerLazySingleton<AuthorizationLocalDataSource>(
    () => AuthorizationLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
  getIt.registerLazySingleton<NavigationHistoryLocalSource>(
    () => NavigationHistoryLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

Future<void> registerNetwork() async {
  final Connectivity connectivity = Connectivity();
  getIt.registerLazySingleton<ConnectivityService>(
    () => ConnectivityServiceImpl(connectivity: connectivity),
  );
  final DioFactory dioFactory = DioFactory();
  await dioFactory.initialize(getIt<ConfigLocalDataSource>());
  getIt.registerFactory<Dio>(() => dioFactory.dio);
  getIt.registerLazySingleton<TokenRefreshService>(
    () => TokenRefreshServiceImpl(
      configLocalDataSource: getIt<ConfigLocalDataSource>(),
      dio: getIt<Dio>(),
    ),
  );
  getIt.registerLazySingleton<TokenInterceptor>(
    () => TokenInterceptor(
      authorizationLocalDataSource: getIt<AuthorizationLocalDataSource>(),
      configLocalDataSource: getIt<ConfigLocalDataSource>(),
      tokenRefreshService: getIt<TokenRefreshService>(),
      dio: getIt<Dio>(),
    ),
  );
  getIt.registerLazySingleton<ServerUrlInterceptor>(() => ServerUrlInterceptor());
}

void registerRemoteDataSources() {
  getIt.registerLazySingleton<AuthorizationRemoteDataSource>(
    () => AuthorizationRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<ServerHealthRemoteDataSource>(
    () => ServerHealthRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<TranslationRemoteDataSource>(
    () => TranslationRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<ConfigRemoteDataSource>(
    () => ConfigRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<OnlineStatusRemoteDataSource>(
    () => OnlineStatusRemoteDataSourceImpl(getIt<Dio>()),
  );
  getIt.registerLazySingleton<UserPickerRemoteDataSource>(
    () => UserPickerRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<AuthorizationRepository>(
    () => AuthorizationRepositoryImpl(
      remoteDataSource: getIt<AuthorizationRemoteDataSource>(),
      localDataSource: getIt<AuthorizationLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<ServerHealthRepository>(
    () => ServerHealthRepositoryImpl(
      remoteDataSource: getIt<ServerHealthRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<ConfigRepository>(
    () => ConfigRepositoryImpl(
      localDataSource: getIt<ConfigLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      remoteDataSource: getIt<ConfigRemoteDataSource>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<TranslationRepository>(
    () => TranslationRepositoryImpl(
      remoteDataSource: getIt<TranslationRemoteDataSource>(),
      localDataSource: getIt<TranslationLocalDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<AssetListRepository>(
    () => AssetListRepositoryImpl(
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<OnlineStatusRepository>(
    () => OnlineStatusRepositoryImpl(
      remoteDataSource: getIt<OnlineStatusRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<UserPickerRepository>(
    () => UserPickerRepositoryImpl(
      remoteDataSource: getIt<UserPickerRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerSingletonBlocs() {
  getIt.registerLazySingleton<AuthorizationBloc>(
    () => AuthorizationBloc(
      authorizationRepository: getIt<AuthorizationRepository>(),
    ),
  );
  getIt.registerLazySingleton<ConfigBloc>(
    () => ConfigBloc(configRepository: getIt<ConfigRepository>()),
  );
  getIt.registerLazySingleton<WebSocketRepository>(
    () => WebSocketRepository(
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
  getIt.registerLazySingleton<WebSocketBloc>(
    () => WebSocketBloc(repository: getIt<WebSocketRepository>()),
  );
  getIt.registerLazySingleton<NavigationCubit>(
    () => NavigationCubit(dispatcher: getIt<Dispatcher>(), routeCubit: getIt<RouteCubit>()),
  );
  getIt.registerLazySingleton<DSChromeCubit>(() => DSChromeCubit());
  getIt.registerLazySingleton<DSLoadingCubit>(() => DSLoadingCubit());
  getIt.registerLazySingleton<DSBannerCubit>(() => DSBannerCubit());
  getIt.registerLazySingleton<DSNotificationCubit>(
    () => PersistentNotificationCubit(getIt<SharedPreferences>()),
  );
  getIt.registerLazySingleton<DSBadgeCubit>(() => PersistentBadgeCubit(getIt<SharedPreferences>()));
  getIt.registerLazySingleton<DSEndDrawerCubit>(() => DSEndDrawerCubit());
  getIt.registerLazySingleton<DSDrawerCubit>(() => DSDrawerCubit());
  getIt.registerLazySingleton<AppScaffoldCubit>(
    () => AppScaffoldCubit(
      chromeCubit: getIt<DSChromeCubit>(),
      loadingCubit: getIt<DSLoadingCubit>(),
      bannerCubit: getIt<DSBannerCubit>(),
      notificationCubit: getIt<DSNotificationCubit>(),
      badgeCubit: getIt<DSBadgeCubit>(),
      endDrawerCubit: getIt<DSEndDrawerCubit>(),
      drawerCubit: getIt<DSDrawerCubit>(),
    ),
  );
  getIt.registerLazySingleton<RouteCubit>(() => RouteCubit());
  getIt.registerLazySingleton<NavigationHistory>(
    () => NavigationHistory(dataSource: getIt<NavigationHistoryLocalSource>()),
  );
  getIt.registerLazySingleton<FormSaveTriggerCubit>(() => FormSaveTriggerCubit());
  getIt.registerLazySingleton<ConnectivityCubit>(
    () => ConnectivityCubit(connectivityService: getIt<ConnectivityService>()),
  );
  getIt.registerLazySingleton<OnlineStatusCubit>(
    () => OnlineStatusCubit(repository: getIt<OnlineStatusRepository>()),
  );
}

void registerFactoryBlocs() {
  getIt.registerFactory<ServerHealthBloc>(
    () => ServerHealthBloc(ServerHealthRepository: getIt<ServerHealthRepository>()),
  );
  getIt.registerFactory<TranslationBloc<ServerPickerPageTranslation>>(
    () => TranslationBloc<ServerPickerPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
  getIt.registerFactory<TranslationBloc<LoginPageTranslation>>(
    () => TranslationBloc<LoginPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
  getIt.registerFactory<TranslationBloc<CommonTranslation>>(
    () => TranslationBloc<CommonTranslation>(translationRepository: getIt<TranslationRepository>()),
  );
  getIt.registerLazySingleton<AssetListBloc<CommonAssetListModel>>(
    () => AssetListBloc<CommonAssetListModel>(assetListRepository: getIt<AssetListRepository>()),
  );
  getIt.registerLazySingleton<AssetListBloc<AssetListModel>>(
    () => AssetListBloc<AssetListModel>(assetListRepository: getIt<AssetListRepository>()),
  );
}

