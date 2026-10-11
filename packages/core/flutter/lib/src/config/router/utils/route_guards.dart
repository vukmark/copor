import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/administration/feature_flags/config/feature_guard.dart';
import 'package:copor_core/src/modules/my_account/config/my_account_router.dart';
import 'package:copor_core/src/modules/my_account/presentation/my_account_page.dart';
import 'package:copor_core/src/utils/home_route_resolver.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

String? appRedirect(BuildContext context, GoRouterState state) {
  final authState = context.read<AuthorizationBloc>().state;
  final configState = context.read<ConfigBloc>().state;
  final bool isLoggedIn = authState.result != null;
  final isServerPickerScreen = state.uri.path == AppRoutes.serverPicker;
  final isRedirectionAllowed = FeatureGuard.checkIfRedirectIsAllowed(context, state.uri.path);
  final redirect = authState.result?.data.redirect;
  final bool isGoingToPublicPage = AppRoutes.publicRoutes.contains(state.fullPath ?? '');

  if (configState.result == null) {
    return null;
  }

  if (configState.ensuredData.isServerUrlNotSet) {
    return isServerPickerScreen ? null : AppRoutes.serverPicker;
  }

  if (isLoggedIn && isGoingToPublicPage) {
    return getIt<SharedPreferences>().getString(lastAppRouteKey) ?? resolveHomeRoute(context);
  }

  if (!isLoggedIn && !isGoingToPublicPage) {
    return AppRoutes.login;
  }

  if (isLoggedIn && redirect != null) {
    return AppRoutes.contractSign;
  }

  if (isLoggedIn && redirect == null && state.uri.path == AppRoutes.contractSign) {
    return MyAccountRoutes.withTab(MyAccountTab.privacy);
  }

  if (isLoggedIn && !isRedirectionAllowed) {
    return AppRoutes.accessDenied;
  }

  return null;
}
