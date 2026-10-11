import 'package:copor_core/src/bloc/global_blocs/connectivity_cubit/connectivity_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/data/model/asset_list/namespace_entity/login_asset_list.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_event.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/route_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/online_status/online_status_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_core/src/utils/push_notification/bloc/fcm_token_cubit.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/components/app_logo.dart';

class BlocFactory {
  static _Translation translation = _Translation();
  static _AssetList assetList = _AssetList();

  static WebSocketBloc initializeWebSocketBloc() {
    return getIt<WebSocketBloc>();
  }

  static NavigationCubit initializeNavigationCubit() {
    return getIt<NavigationCubit>();
  }

  static ServerHealthBloc initializeServerHealthBloc() {
    return getIt<ServerHealthBloc>();
  }

  static AppScaffoldCubit initializeAppScaffoldCubit() {
    final Widget logo = SizedBox(
      height: 20,
      child: const AppLogoSvg(),
    );
    final cubit = getIt<AppScaffoldCubit>();
    cubit.updateAppBar(title: logo);
    return cubit;
  }

  static DSChromeCubit initializeChromeCubit() => getIt<DSChromeCubit>();

  static DSLoadingCubit initializeLoadingCubit() => getIt<DSLoadingCubit>();

  static DSBannerCubit initializeBannerCubit() => getIt<DSBannerCubit>();

  static DSNotificationCubit initializeNotificationCubit() => getIt<DSNotificationCubit>();

  static DSBadgeCubit initializeBadgeCubit() => getIt<DSBadgeCubit>();

  static DSEndDrawerCubit initializeEndDrawerCubit() => getIt<DSEndDrawerCubit>();

  static DSDrawerCubit initializeDrawerCubit() => getIt<DSDrawerCubit>();

  static RouteCubit initializeRouteCubit() {
    return getIt<RouteCubit>();
  }

  static ConfigBloc initializeConfigBloc() {
    final bloc = getIt<ConfigBloc>();
    BlocEventDispatcher.config.getConfig(bloc);
    return bloc;
  }

  static AuthorizationBloc initializeAuthorizationBloc() {
    final bloc = getIt<AuthorizationBloc>();
    bloc.add(GetTokens());
    return bloc;
  }

  static FcmTokenCubit initializeFcmTokenCubit() {
    final bloc = getIt<FcmTokenCubit>();
    return bloc;
  }

  static ConnectivityCubit initializeConnectivityCubit() {
    final cubit = getIt<ConnectivityCubit>();
    cubit.initialize();
    return cubit;
  }

  static OnlineStatusCubit initializeOnlineStatusCubit() {
    return getIt<OnlineStatusCubit>();
  }
}

class _AssetList {
  AssetListBloc<CommonAssetListModel> initializeCommonAssetList() {
    final bloc = getIt<AssetListBloc<CommonAssetListModel>>();
    return bloc;
  }
}

class _Translation {
  TranslationBloc<ServerPickerPageTranslation> initializeServerPickerTranslationBloc(
    BuildContext context,
  ) {
    final bloc = getIt<TranslationBloc<ServerPickerPageTranslation>>();
    final configState = context.read<ConfigBloc>().state;
    if (configState.result != null) {
      BlocEventDispatcher.translation.getServerPickerTranslation(
        bloc,
        configState.ensuredData.language,
      );
    }
    return bloc;
  }

  TranslationBloc<LoginPageTranslation> initializeLoginPageTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<LoginPageTranslation>>();
    final configState = context.read<ConfigBloc>().state;
    if (configState.result != null) {
      BlocEventDispatcher.translation.getLoginPageTranslation(
        bloc,
        configState.ensuredData.language,
      );
    }
    return bloc;
  }

  

  TranslationBloc<CommonTranslation> initializeCommonTranslationBloc() {
    final bloc = getIt<TranslationBloc<CommonTranslation>>();
    return bloc;
  }
}
