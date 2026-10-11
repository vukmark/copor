import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

class CloudGroupPageScope extends ScopeBuilder {
  const CloudGroupPageScope({super.key, required super.id, required super.child});

  static const String scopeId = 'user_group_page_scope';

  @override
  Widget buildScope(BuildContext context, Widget child) {
    return BlocProvider(
      create: (context) => getIt<CoporFormBloc>(),
      child: Builder(
        builder: (context) {
          return MultiBlocListener(
            listeners: [
              CoporFormListener(
                additionalLogic: (_) => GetIt.instance<DrivePageCubit>().loadMyDriveFolders(),
              ),
              FailureListener<CoporFormBloc, CoporFormState>(failureKey: 'user_group_form_failure'),
              CoporFormInitialLoadFailureListener(),
            ],
            child: child,
          );
        },
      ),
    );
  }
}
