import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/config/server_picker_keys.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_event_dispatcher.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../config/dependency_injection.dart';

class BlocReactions {
  static ServerPicker serverPicker = ServerPicker();
  static App app = App();
  static Login login = Login();
  static Common common = Common();
}

class Common {
  void addRequestLoadingToScaffold(BuildContext context, BaseState state, String key) {
    final cubit = context.getBloc.appScaffold;
    state.isLoading == true ? cubit.addRequestLoading(key) : cubit.removeLoadingSource(key);
  }

  void addPageLoadingToScaffold(BuildContext context, BaseState state, String key) {
    final cubit = context.getBloc.appScaffold;
    state.isLoading == true ? cubit.addPageLoading(key) : cubit.removeLoadingSource(key);
  }

  void addFailureToScaffold(BuildContext context, BaseState state, String key) {
    if (state.failure != null) {
      final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;

      context.getBloc.appScaffold.addBanner(
        DSBanner.error(getTranslatedFailureMessage(state.failure!, translation), source: key),
      );
    }
  }

  void addWarningToScaffold(BuildContext context, BaseState state, String key) {
    if (state.result != null && state.result!.warning != null) {
      final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;

      context.getBloc.appScaffold.addBanner(
        DSBanner.warning(
          getTranslatedFailureMessage(state.result!.warning!, translation),
          source: key,
        ),
      );
    }
  }

  void addSuccessToScaffold(BuildContext context, String message, String key) {
    context.getBloc.appScaffold.addBanner(DSBanner.success(message, source: key));
  }
}

class App {
  void connectToWebSocketIfReady(
    BuildContext context,
    AuthorizationState authState,
    ConfigState configState,
  ) {
    final webSocketBloc = context.read<WebSocketBloc>();
    final wsState = webSocketBloc.state;

    final bool isAlreadyConnectedOrConnecting =
        wsState is WebSocketConnecting || wsState is WebSocketConnected;

    if (isAlreadyConnectedOrConnecting) {
      // debugPrint("WebSocket connection attempt skipped: already connected or connecting.");
      return;
    }

    if (configState.result != null &&
        authState.result?.data != null &&
        authState.ensuredData.authToken.isNotEmpty) {
      BlocEventDispatcher.webSocket.connectToWebSocket(
        webSocketBloc,
        authState.ensuredData.authToken,
        configState.ensuredData.webSocketUrl,
      );
    }
  }

  void getPreferencesWhenAuthenticated(BuildContext context, AuthorizationState state) {
    if (state.result != null) {
      PreferencesBlocEventDispatcher.preferences.getPreferences(context.getBloc.preferences);
    }
  }

  void getCommonTranslation(BuildContext context, ConfigState state) {
    if (state.result != null && !state.isLoading) {
      BlocEventDispatcher.translation.getCommonTranslation(
        context.getBloc.commonTranslation,
        context.config.currentLanguage,
      );
    }
  }

  void getCommonAssetListWhenBaseUrlIsSet(BuildContext context, ConfigState state) {
    if (state.result != null && !state.isLoading && !state.result!.data.isServerUrlNotSet) {
      BlocEventDispatcher.assetList.getCommonAssetList(context.getBloc.commonAssetList);
    }
  }
}

class ServerPicker {
  void updateBaseUrlAndGet(BuildContext context, ServerHealthState state) {
    final translation = context.getState.serverPickerTranslation.ensuredData;

    if (state.failure != null) {
      context.getBloc.appScaffold.clearBanners();
      context.getBloc.appScaffold.addBanner(
        DSBanner.error(
          translation.PLEASE_ENTER_A_VALID_SERVER_URL,
          source: ServerPickerKeys.serverPickerErrorView,
        ),
      );
      return;
    }

    if (state.result?.data != null && state.result?.data.isHealthy == false) {
      context.getBloc.appScaffold.addBanner(
        DSBanner.error(
          translation.PLEASE_ENTER_A_VALID_SERVER_URL,
          source: ServerPickerKeys.serverPickerErrorView,
        ),
      );
      return;
    }

    if (state.result != null && state.result!.data.isHealthy == true) {
      BlocEventDispatcher.config.updateBaseUrl(context.getBloc.config, state.ensuredData.serverUrl);
    }
  }

  void rerouteIfConfigBaseUrlSet(BuildContext context, ConfigState state) {
    final serverHealthState = context.getState.serverHealth;
    if (serverHealthState.result != null &&
        serverHealthState.result!.data.isHealthy == true &&
        !state.ensuredData.isServerUrlNotSet) {
      goToPage(AppRoutes.login);
    }
  }

  void getServerPickerTranslation(BuildContext context) {
    BlocEventDispatcher.translation.getServerPickerTranslation(
      context.getBloc.serverPickerTranslation,
      context.config.currentLanguage,
    );
  }
}

class Login {
  void rerouteFromLoginPage(BuildContext context, AuthorizationState state) {
    if (state.result != null) {
      final savedRoute = getIt<SharedPreferences>().getString(lastAppRouteKey);
      goToPage(savedRoute ?? AppRoutes.homepage);
    }
  }

  void getLoginPageTranslation(BuildContext context) {
    BlocEventDispatcher.translation.getLoginPageTranslation(
      context.getBloc.loginTranslation,
      context.config.currentLanguage,
    );
  }
}
