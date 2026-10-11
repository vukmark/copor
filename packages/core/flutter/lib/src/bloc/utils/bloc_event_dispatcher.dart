import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_event.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_event.dart';
import 'package:copor_core/src/data/model/asset_list/namespace_entity/login_asset_list.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_event.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_event.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_event.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_event.dart';

class BlocEventDispatcher {
  static _Translation translation = _Translation();
  static _AssetList assetList = _AssetList();
  static _Config config = _Config();
  static _Authorization authorization = _Authorization();
  static _WebSocket webSocket = _WebSocket();
}

class _Translation {
  void getServerPickerTranslation(
    TranslationBloc<ServerPickerPageTranslation> bloc,
    LanguageModel language,
  ) {
    bloc.add(
      GetTranslationEvent<ServerPickerPageTranslation>(
        namespace: ServerPickerPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            ServerPickerPageTranslation(translationStringList: translationStringList),
      ),
    );
  }

  void getLoginPageTranslation(TranslationBloc<LoginPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<LoginPageTranslation>(
        namespace: LoginPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            LoginPageTranslation(translationStringList: translationStringList),
      ),
    );
  }

  

  void getCommonTranslation(TranslationBloc<CommonTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<CommonTranslation>(
        namespace: CommonTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            CommonTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _AssetList {
  void getCommonAssetList(AssetListBloc<CommonAssetListModel> bloc) {
    bloc.add(
      FetchAssetList<CommonAssetListModel>(
        namespace: CommonAssetListModel.namespaceStatic,
        constructor: (assetUrlList) => CommonAssetListModel(assetUrlList: assetUrlList),
      ),
    );
  }
}

class _Config {
  void updateAppLanguage(ConfigBloc bloc, LanguageModel newLanguageModel) {
    bloc.add(UpdateAppLanguage(newLanguageModel));
  }

  void getConfig(ConfigBloc bloc) {
    bloc.add(GetConfig());
  }

  void updateUserRememberedStatus(ConfigBloc bloc, bool isUserRemembered) {
    bloc.add(UpdateIsServerUrlRemembered(isUserRemembered));
  }

  void updateBaseUrl(ConfigBloc bloc, String baseUrl) {
    bloc.add(UpdateBaseUrl(baseUrl));
  }

  void updateServerRememberedStatus(ConfigBloc bloc, bool isRememberServerChecked) {
    bloc.add(UpdateIsServerUrlRemembered(isRememberServerChecked));
  }

  void checkBaseUrlHealth(ServerHealthBloc bloc, String baseUrl) {
    bloc.add(CheckBaseUrlHealth(baseUrl));
  }
}

class _Authorization {
  void login(AuthorizationBloc bloc, String username, String password) {
    bloc.add(Login(username: username, password: password));
  }

  void logout(
    AuthorizationBloc authBloc,
    AccountInfoBloc accountInfoBloc,
    WebSocketBloc webSocketBloc,
  ) async {
    accountInfoBloc.add(const AccountInfoReset());
    await clearAuthState(authBloc);
    webSocketBloc.add(DisconnectWebSocket());
  }

  Future<void> clearAuthState(AuthorizationBloc authBloc) async {
    authBloc.add(Logout());
  }

  void changePassword(AuthorizationBloc bloc, String oldPassword, String newPassword) {
    bloc.add(ChangePassword(oldPassword: oldPassword, newPassword: newPassword));
  }
}

class _WebSocket {
  void connectToWebSocket(WebSocketBloc bloc, String authToken, String webSocketUrl) {
    bloc.add(ConnectWebSocket(token: authToken, webSocketUrl: webSocketUrl));
  }
}
