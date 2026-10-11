import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class PermissionsPage extends StatelessWidget {
  const PermissionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;

    return DSPageWrapper(
      isMobile: context.isMobile,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DTListTile.surface(
                icon: PhosphorIconsThin.shieldCheck,
                label: translations.ROLE_PERMISSION,
                onPressed: () => goToPage(AppRoutes.permissionRole),
              ),
              const SizedBox(height: 8),
              DTListTile.surface(
                icon: PhosphorIconsThin.usersFour,
                label: translations.USER_GROUP_PERMISSION,
                onPressed: () => goToPage(AppRoutes.permissionUserGroup),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
