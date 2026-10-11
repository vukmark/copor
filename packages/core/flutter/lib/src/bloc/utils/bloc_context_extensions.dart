import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_state.dart';
import 'package:copor_core/src/data/model/asset_list/namespace_entity/login_asset_list.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/modules/administration/state/data/model/translation/state_translation.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/modules/administration/language/data/model/translation/language_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_state.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_state.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_state.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_state.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

extension BlocContextExtensions on BuildContext {
  WatchState get watchState => WatchState(this);

  GetState get getState => GetState(this);

  ConfigContextExtensions get config => ConfigContextExtensions(this);

  GetBloc get getBloc => GetBloc(this);
}

class ConfigContextExtensions {
  final BuildContext context;

  ConfigContextExtensions(this.context);

  bool get isServerUrlNotSet {
    final configState = context.read<ConfigBloc>().state;

    return configState.ensuredData.isServerUrlNotSet;
  }

  LanguageModel get currentLanguage {
    final configState = context.read<ConfigBloc>().state;

    return configState.ensuredData.language;
  }

  String get serverUrl {
    final configState = context.read<ConfigBloc>().state;

    return configState.ensuredData.baseUrl;
  }
}

class GetBloc {
  final BuildContext context;

  GetBloc(this.context);

  ConfigBloc get config => context.read<ConfigBloc>();

  AccountInfoBloc get accountInfo => context.read<AccountInfoBloc>();

  PreferencesBloc get preferences => context.read<PreferencesBloc>();

  AuthorizationBloc get authorization => context.read<AuthorizationBloc>();

  TranslationBloc<CommonTranslation> get commonTranslation =>
      context.read<TranslationBloc<CommonTranslation>>();

  TranslationBloc<ServerPickerPageTranslation> get serverPickerTranslation =>
      context.read<TranslationBloc<ServerPickerPageTranslation>>();

  TranslationBloc<LoginPageTranslation> get loginTranslation =>
      context.read<TranslationBloc<LoginPageTranslation>>();

  TranslationBloc<MyAccountPageTranslation> get myAccountTranslation =>
      context.read<TranslationBloc<MyAccountPageTranslation>>();

  TranslationBloc<StatePageTranslation> get stateTranslation =>
      context.read<TranslationBloc<StatePageTranslation>>();

  TranslationBloc<RegistrationPageTranslation> get registrationTranslation =>
      context.read<TranslationBloc<RegistrationPageTranslation>>();

  AssetListBloc<CommonAssetListModel> get commonAssetList =>
      context.read<AssetListBloc<CommonAssetListModel>>();

  ServerHealthBloc get serverHealth => context.read<ServerHealthBloc>();

  LanguageBloc get languageList => context.read<LanguageBloc>();

  AppScaffoldCubit get appScaffold => context.read<AppScaffoldCubit>();

  NavigationCubit get navigation => context.read<NavigationCubit>();

  TranslationBloc<LanguagePageTranslation> get languageTranslation =>
      context.read<TranslationBloc<LanguagePageTranslation>>();

  WebSocketBloc get webSocket => context.read<WebSocketBloc>();

}

class WatchState {
  final BuildContext context;

  WatchState(this.context);

  ConfigState get config => context.watch<ConfigBloc>().state;

  AccountInfoState get accountInfo => context.watch<AccountInfoBloc>().state;

  PreferencesState get preferences => context.watch<PreferencesBloc>().state;

  AuthorizationState get authorization => context.watch<AuthorizationBloc>().state;

  TranslationState<CommonTranslation> get commonTranslation =>
      context.watch<TranslationBloc<CommonTranslation>>().state;

  TranslationState<ServerPickerPageTranslation> get serverPickerTranslation =>
      context.watch<TranslationBloc<ServerPickerPageTranslation>>().state;

  TranslationState<LoginPageTranslation> get loginTranslation =>
      context.watch<TranslationBloc<LoginPageTranslation>>().state;

  TranslationState<MyAccountPageTranslation> get myAccountTranslation =>
      context.watch<TranslationBloc<MyAccountPageTranslation>>().state;

  TranslationState<RegistrationPageTranslation> get registrationTranslation =>
      context.read<TranslationBloc<RegistrationPageTranslation>>().state;

  AssetListState<CommonAssetListModel> get commonAssetList =>
      context.watch<AssetListBloc<CommonAssetListModel>>().state;

  ServerHealthState get serverHealth => context.watch<ServerHealthBloc>().state;

  LanguageListState get languageList => context.watch<LanguageBloc>().state;

  NavigationState get navigation => context.watch<NavigationCubit>().state;

  TranslationState<LanguagePageTranslation> get languageTranslation =>
      context.watch<TranslationBloc<LanguagePageTranslation>>().state;

}

class GetState {
  final BuildContext context;

  GetState(this.context);

  ConfigState get config => context.read<ConfigBloc>().state;

  AccountInfoState get accountInfo => context.read<AccountInfoBloc>().state;

  PreferencesState get preferences => context.read<PreferencesBloc>().state;

  AuthorizationState get authorization => context.read<AuthorizationBloc>().state;

  TranslationState<CommonTranslation> get commonTranslation =>
      context.read<TranslationBloc<CommonTranslation>>().state;

  TranslationState<ServerPickerPageTranslation> get serverPickerTranslation =>
      context.read<TranslationBloc<ServerPickerPageTranslation>>().state;

  TranslationState<LoginPageTranslation> get loginTranslation =>
      context.read<TranslationBloc<LoginPageTranslation>>().state;

  TranslationState<MyAccountPageTranslation> get myAccountTranslation =>
      context.read<TranslationBloc<MyAccountPageTranslation>>().state;

  TranslationState<RegistrationPageTranslation> get registrationTranslation =>
      context.read<TranslationBloc<RegistrationPageTranslation>>().state;

  AssetListState<CommonAssetListModel> get commonAssetList =>
      context.read<AssetListBloc<CommonAssetListModel>>().state;

  ServerHealthState get serverHealth => context.read<ServerHealthBloc>().state;

  LanguageListState get languageList => context.read<LanguageBloc>().state;

  TranslationState<LanguagePageTranslation> get languageTranslation =>
      context.read<TranslationBloc<LanguagePageTranslation>>().state;

}
