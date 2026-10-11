import 'package:flutter/material.dart';

final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
final GlobalKey<NavigatorState> rootNavigatorKey = GlobalKey<NavigatorState>(
  debugLabel: 'rootNavigator',
);

class GlobalKeys {
  static const scaffoldDrawer = 'scaffold_drawer';
  static const bottomNavBar = 'bottom_nav_bar';
  static const badge = 'badge';
  static const guardedBlocBuilderKey = 'guarded_bloc_builder_key';
  static const floatingContainerBackgroundImage = 'floating_container_background_image';
  static const floatingContainer = 'floatingContainer';
}

class CoporAppKeys {
  static const loadingCommonTranslation = 'loadingCommonTranslation';
  static const loadingCommonAssetList = 'loadingCommonAssetList';
  static const loadingPreferences = 'loadingPreferences';
  static const loadingAccountInfo = 'loadingAccountInfo';
  static const loadingAuthorization = 'loadingAuthorization';
  static const loadingConfig = 'loadingConfig';
  static const commonTranslationFailure = 'commonTranslationFailure';
  static const commonAssetListFailure = 'commonAssetListFailure';
  static const preferencesFailure = 'preferencesFailure';
  static const accountInfoFailure = 'accountInfoFailure';
  static const authorizationFailure = 'authorizationFailure';
  static const configFailure = 'configFailure';
  static const commonTranslationWarning = 'commonTranslationWarning';
  static const commonAssetListWarning = 'commonAssetListWarning';
  static const preferencesWarning = 'preferencesWarning';
  static const accountInfoWarning = 'accountInfoWarning';
  static const authorizationWarning = 'authorizationWarning';
  static const configWarning = 'configWarning';
}
