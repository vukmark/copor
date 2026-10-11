import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class FeaturePageScope extends ScopeBuilder {
  const FeaturePageScope({super.key, required super.id, required super.child});

  static const String featurePageScopeString = 'feature_page_scope';

  @override
  Widget buildScope(BuildContext context, Widget child) {
    return MultiBlocProvider(
      providers: [BlocScopeRegistry.provider<FeatureAdminBloc>(id)],
      child: Builder(
        builder: (context) {
          return MultiBlocListener(
            listeners: [
              FailureListener<FeatureAdminBloc, FeatureAdminState>(
                failureKey: 'feature_admin_failure',
              ),
              LoadingListener<FeatureAdminBloc, FeatureAdminState>(
                loadingKey: 'feature_admin_loading',
              ),
              BlocListener<FeatureAdminBloc, FeatureAdminState>(
                listenWhen: (previous, current) =>
                    previous.isUpdated != current.isUpdated && current.isUpdated,
                listener: (context, state) {
                  final bloc = context.read<FeatureAccessBloc>();
                  bloc.add(GetFeatureList());
                },
              ),
            ],
            child: child,
          );
        },
      ),
    );
  }
}
