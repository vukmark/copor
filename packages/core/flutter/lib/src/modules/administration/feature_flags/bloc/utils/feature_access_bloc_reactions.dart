import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_event.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class FeatureAccessBlocReactions {
  static FeatureAccess featureAccess = FeatureAccess();
}

class FeatureAccess {
  void getFeatureAccessWhenAuthenticated(BuildContext context, AuthorizationState state) {
    final authorizationData = state.result;
    if (authorizationData != null && authorizationData.data.authToken.isNotEmpty) {
      final bloc = context.read<FeatureAccessBloc>();
      bloc.add(GetFeatureList());
    }
  }

  void getMenuWhenAuthenticated(BuildContext context, AuthorizationState state) {
    final authorizationData = state.result;
    if (authorizationData != null && authorizationData.data.authToken.isNotEmpty) {
      context.read<MenuBloc>().add(GetMenuList());
    }
  }

  void getMenuWhenLanguageChanges(BuildContext context, ConfigState state) {
    if (state.result == null || state.isLoading) return;

    final token = context.read<AuthorizationBloc>().state.result?.data.authToken ?? '';
    if (token.isEmpty) return;

    context.read<MenuBloc>().add(GetMenuList());
  }

  void getMenuIfNotLoaded(BuildContext context) {
    final menuBloc = context.read<MenuBloc>();
    if (menuBloc.state.result == null && !menuBloc.state.isLoading) {
      menuBloc.add(GetMenuList());
    }
  }
}
