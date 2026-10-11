import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/utils/form_save_trigger_cubit.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/app_router.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/core/security/biometric_app_lock.dart';
import 'package:copor_core/src/data/model/asset_list/namespace_entity/login_asset_list.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/utils/feature_access_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/utils/feature_access_bloc_reactions.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/utils/dashboard_menu_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/utils/dashboard_menu_bloc_reactions.dart';
import 'package:copor_core/src/modules/administration/language/config/language_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/utils/tag_bloc_factory.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/modules/my_account/bloc/utils/account_bloc_factory.dart';
import 'package:copor_core/src/modules/my_account/bloc/utils/account_bloc_reactions.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_state.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/utils/notification_counter_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/utils/notification_counter_bloc_factory.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_factory.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_reactions.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/theme/theme_utils.dart';
import 'package:copor_core/src/bloc/utils/bloc_factory.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_core/src/utils/global_keys.dart';
import 'package:copor_core/src/config/connection_manager.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:copor_core/src/utils/caret_navigation_fallback.dart';

// **************************************************************************
// Providers
// **************************************************************************

MultiBlocProvider _multiBlocProvider(BuildContext context, {required Widget child}) {
  return MultiBlocProvider(
    providers: [
      BlocProvider(create: (_) => LanguageBlocFactory.initializeLanguageBloc()),
      BlocProvider(create: (_) => BlocFactory.initializeChromeCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeLoadingCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeBannerCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeNotificationCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeBadgeCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeEndDrawerCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeDrawerCubit()),
      Provider(create: (_) => BlocFactory.initializeAppScaffoldCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeNavigationCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeWebSocketBloc()),
      BlocProvider(lazy: false, create: (_) => BlocFactory.initializeOnlineStatusCubit()),
      BlocProvider(create: (_) => BlocFactory.initializeConfigBloc()),
      BlocProvider(create: (_) => BlocFactory.initializeAuthorizationBloc()),
      BlocProvider(create: (_) => MyAccountBlocFactory.initializeAccountInfoBloc()),
      BlocProvider(create: (_) => PreferencesBlocFactory.initializePreferencesBloc()),
      BlocProvider(create: (_) => FeatureAccessBlocFactory.initializeFeatureAccessBloc()),
      BlocProvider(create: (_) => FeatureAccessBlocFactory.initializeMenuBloc()),
      BlocProvider(create: (_) => DashboardMenuBlocFactory.initializeDashboardMenuBloc()),
      BlocProvider(create: (_) => BlocFactory.translation.initializeCommonTranslationBloc()),
      BlocProvider(create: (_) => BlocFactory.assetList.initializeCommonAssetList()),
      BlocProvider(create: (_) => BlocFactory.initializeRouteCubit()),
      for (final module in AppModules.enabled) ...module.globalProviders(context),
      BlocProvider(
        create: (_) => NotificationCounterBlocFactory.initializeNotificationCounterBloc(),
      ),
      BlocProvider(create: (_) => BlocFactory.initializeFcmTokenCubit()),
      BlocProvider(create: (_) => TagBlocFactory.initializePublicTagListBloc(context)),
      BlocProvider(create: (_) => TagBlocFactory.initializeTagFormBloc()),
      BlocProvider(create: (_) => getIt<FormSaveTriggerCubit>()),
      BlocProvider(create: (_) => BlocFactory.initializeConnectivityCubit()),
    ],
    child: child,
  );
}

// **************************************************************************
// Listeners (Updated Section)
// **************************************************************************

MultiBlocListener _multiBlocListener(BuildContext context, {required Widget child}) {
  return MultiBlocListener(
    listeners: [
      createStandardListener<
        TranslationBloc<CommonTranslation>,
        TranslationState<CommonTranslation>
      >(
        loadingKey: CoporAppKeys.loadingCommonTranslation,
        failureKey: CoporAppKeys.commonTranslationFailure,
        warningKey: CoporAppKeys.commonTranslationWarning,
      ),
      createStandardListener<
        AssetListBloc<CommonAssetListModel>,
        AssetListState<CommonAssetListModel>
      >(
        loadingKey: CoporAppKeys.loadingCommonAssetList,
        failureKey: CoporAppKeys.commonAssetListFailure,
        warningKey: CoporAppKeys.commonAssetListWarning,
      ),
      createStandardListener<PreferencesBloc, PreferencesState>(
        loadingKey: CoporAppKeys.loadingPreferences,
        failureKey: CoporAppKeys.preferencesFailure,
        warningKey: CoporAppKeys.preferencesWarning,
        additionalLogic: (context, state) =>
            PreferencesBlocReactions.preferences.updateLanguageIfAuthenticated(context),
      ),
      createStandardListener<AuthorizationBloc, AuthorizationState>(
        loadingKey: CoporAppKeys.loadingAuthorization,
        failureKey: CoporAppKeys.authorizationFailure,
        warningKey: CoporAppKeys.authorizationWarning,
        listenWhen: (prev, curr) {
          final prevToken = prev.result?.data.authToken ?? '';
          final currToken = curr.result?.data.authToken ?? '';
          final becameAuthenticated = prevToken.isEmpty && currToken.isNotEmpty;

          final failureChanged = prev.failure != curr.failure;
          final loadingFinished = prev.isLoading && !curr.isLoading;

          return becameAuthenticated || failureChanged || loadingFinished;
        },
        additionalLogic: (context, state) {
          PreferencesBlocReactions.preferences.getPreferencesWhenAuthenticated(context, state);
          MyAccountBlocReactions.myAccount.getAccountInfoWhenAuthenticated(context, state);
          FeatureAccessBlocReactions.featureAccess.getFeatureAccessWhenAuthenticated(
            context,
            state,
          );
          FeatureAccessBlocReactions.featureAccess.getMenuWhenAuthenticated(context, state);
          DashboardMenuBlocReactions.dashboardMenu.getDashboardMenuWhenAuthenticated(
            context,
            state,
          );
          final token = state.result?.data.authToken ?? '';
          if (token.isNotEmpty) {
            NotificationCounterDispatcher.notificationCounter.getNotificationsCount();
          }
        },
      ),
      createStandardListener<ConfigBloc, ConfigState>(
        loadingKey: CoporAppKeys.loadingConfig,
        failureKey: CoporAppKeys.configFailure,
        warningKey: CoporAppKeys.configWarning,
        additionalLogic: (context, state) {
          BlocReactions.app.getCommonTranslation(context, state);
          BlocReactions.app.getCommonAssetListWhenBaseUrlIsSet(context, state);
          FeatureAccessBlocReactions.featureAccess.getMenuWhenLanguageChanges(context, state);
          DashboardMenuBlocReactions.dashboardMenu.getDashboardMenuWhenLanguageChanges(
            context,
            state,
          );
        },
      ),
    ],
    child: child,
  );
}

// **************************************************************************
// Main Widgets
// **************************************************************************

class CoporApp extends StatelessWidget {
  const CoporApp({super.key});

  @override
  Widget build(BuildContext context) {
    return DSBreakpointsScope(
      breakpoints: appBreakpoints,
      child: _multiBlocProvider(
        context,
        child: _multiBlocListener(
          context,
          child: ConnectionManager(
            child: Builder(
              builder: (context) {
                final theme = AppThemeHelper.resolve(context);
                DeviceService.instance.update(context);
                return MaterialApp.router(
                  routerConfig: appRouter,
                  scaffoldMessengerKey: scaffoldMessengerKey,
                  debugShowCheckedModeBanner: false,
                  theme: theme.lightTheme,
                  darkTheme: theme.darkTheme,
                  themeMode: theme.themeMode,
                  localizationsDelegates: localizationsDelegates,
                  supportedLocales: supportedLocales,
                  builder: (context, child) => BlocBuilder<AuthorizationBloc, AuthorizationState>(
                    builder: (context, authorizationState) {
                      final isAuthenticated =
                          authorizationState.result?.data.authToken.isNotEmpty ?? false;
                      return BlocBuilder<AccountInfoBloc, AccountInfoState>(
                        builder: (context, accountInfoState) => wrapWithCaretNavigationFallback(
                          BiometricAppLock(
                            sharedPreferences: getIt<SharedPreferences>(),
                            isAuthenticated: isAuthenticated,
                            userId: accountInfoState.result?.data.id,
                            child: child ?? const SizedBox.shrink(),
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
