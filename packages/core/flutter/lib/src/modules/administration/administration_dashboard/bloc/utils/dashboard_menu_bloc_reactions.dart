import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_bloc.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_event.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DashboardMenuBlocReactions {
  static DashboardMenuAccess dashboardMenu = DashboardMenuAccess();
}

class DashboardMenuAccess {
  void getDashboardMenuWhenAuthenticated(BuildContext context, AuthorizationState state) {
    final authorizationData = state.result;
    if (authorizationData != null && authorizationData.data.authToken.isNotEmpty) {
      context.read<DashboardMenuBloc>().add(GetDashboardMenu());
    }
  }

  /// Dashboard category/item titles are translated by the backend, so the menu has to be
  /// refetched whenever the app language changes.
  void getDashboardMenuWhenLanguageChanges(BuildContext context, ConfigState state) {
    if (state.result == null || state.isLoading) return;

    final token = context.read<AuthorizationBloc>().state.result?.data.authToken ?? '';
    if (token.isEmpty) return;

    context.read<DashboardMenuBloc>().add(GetDashboardMenu());
  }
}
