import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_back_button.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_scaffold/copor_scaffold.dart'
    show DSAppBarLeading, DSAppBarTitle, DSPageDrawer;
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_theme/copor_theme.dart';

class PermissionsScaffold implements DSPageDrawer, DSAppBarTitle, DSAppBarLeading {
  const PermissionsScaffold();

  @override
  Widget getLeading() => const _PermissionsBackButton();

  @override
  Widget getTitle() => Builder(
    builder: (context) {
      final currentRoute = context.select((NavigationCubit cubit) => cubit.state.selectedRoute);

      return ScaffoldTitlePill(
        icon: (_) => switch (currentRoute) {
          AppRoutes.permissionRole => PhosphorIconsThin.shieldCheck,
          AppRoutes.permissionUserGroup => PhosphorIconsThin.usersFour,
          _ => PhosphorIconsThin.lockKey,
        },
        label: (t) => switch (currentRoute) {
          AppRoutes.permissionRole => t.ROLE_PERMISSION,
          AppRoutes.permissionUserGroup => t.USER_GROUP_PERMISSION,
          _ => t.PERMISSIONS,
        },
      );
    },
  );
}

class _PermissionsBackButton extends StatelessWidget {
  const _PermissionsBackButton();

  @override
  Widget build(BuildContext context) {
    final currentRoute = context.select((NavigationCubit cubit) => cubit.state.selectedRoute);
    final backRoute = currentRoute == AppRoutes.permissions
        ? AppRoutes.administrationDashboard
        : AppRoutes.permissions;

    return AppBarBackButton(
      onPressed: () {
        goToPage(backRoute);
      },
    );
  }
}
