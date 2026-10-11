import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/user_permissions_view/user_permissions_view_cubit.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/user_permissions_view/user_permissions_view_state.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import 'user_permissions_feature_list.dart';

class UserPermissionsViewModal extends StatelessWidget {
  final String userId;

  const UserPermissionsViewModal({super.key, required this.userId});

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;

    return BlocProvider<UserPermissionsViewCubit>(
      create: (_) => GetIt.instance<UserPermissionsViewCubit>()..load(userId),
      child: LayoutBuilder(
        builder: (context, constraints) => DTModalShell(
          isMobile: constraints.maxWidth < kMobileBreakpoint,
          desktopHeight: 640,
          builder: (context) => DTFloatingLayout(
            actionPosition: FloatingContainerActionPosition.top,
            title: translations.PERMISSIONS,
            icon: PhosphorIconsThin.shieldCheck,
            expandedChild: BlocBuilder<UserPermissionsViewCubit, UserPermissionsViewState>(
              builder: (context, state) => switch (state) {
                UserPermissionsViewInitial() ||
                UserPermissionsViewLoading() => const Center(child: DTRingLoader()),
                UserPermissionsViewError(:final failure) => Center(child: Text(failure.toString())),
                UserPermissionsViewLoaded(:final featurePermissions) => UserPermissionsFeatureList(
                  featurePermissions: featurePermissions,
                ),
              },
            ),
            children: const [],
          ),
        ),
      ),
    );
  }
}
