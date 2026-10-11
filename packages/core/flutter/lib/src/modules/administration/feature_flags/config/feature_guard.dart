import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class FeatureGuard {
  static bool checkIfRedirectIsAllowed(BuildContext context, String currentUri) {
    final authBloc = context.read<AuthorizationBloc>();

    if (authBloc.state.isLoading == false && authBloc.state.result == null) {
      return true;
    }

    if (AppRoutes.alwaysAccessibleRoutes.any((route) => currentUri.startsWith(route))) return true;

    final state = context.read<FeatureAccessBloc>().state;

    if (state.result == null || state.isLoading) {
      return true;
    }

    final model = state.ensuredData;

    final features = model.featureList;

    bool isAllowed = features.any((feature) => currentUri.startsWith(feature));

    if (!isAllowed) {
      return false;
    }

    return true;
  }
}
