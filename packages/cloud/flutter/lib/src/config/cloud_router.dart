import 'package:copor_cloud/src/config/cloud_routes.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/config/router/helper_pages/modal_route_host.dart';
import 'package:copor_core/src/config/router/helper_pages/new_transparent_page.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_cloud/src/config/scopes/cloud_group_page_scope.dart';
import 'package:copor_cloud/src/presentation/screens/create_cloud_group_page.dart';
import 'package:copor_cloud/src/presentation/cloud_module_root.dart';
import 'package:copor_cloud/src/presentation/screens/edit_cloud_group_page.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createCloudRoute() {
  return StatefulShellBranch(routes: _getDriveRoutes());
}

List<RouteBase> _getDriveRoutes() {
  return [
    GoRoute(
      path: CloudRoutes.cloud,
      pageBuilder: (context, state) => const NoAnimationPage(child: CloudModuleRoot()),
      routes: [
        GoRoute(
          path: 'create',
          pageBuilder: (context, state) {
            final translation = context.getState.commonTranslation.ensuredData;
            updateTitle(context, translation.CREATE);
            addCoporFormSaveButtonToAppBar(context);
            return NewTransparentPage(
              key: state.pageKey,
              child: CloudGroupPageScope(
                id: CloudGroupPageScope.scopeId,
                child: ModalRouteHost(
                  dialogBuilder: (ctx) => BlocProvider.value(
                    value: ctx.read<CoporFormBloc>(),
                    child: const CreateCloudGroupPage(),
                  ),
                ),
              ),
            );
          },
        ),
        GoRoute(
          path: ':id/edit',
          pageBuilder: (context, state) {
            final id = state.pathParameters['id']!;
            final translation = context.getState.commonTranslation.ensuredData;
            updateTitle(context, translation.EDIT);
            addCoporFormSaveButtonToAppBar(context);
            return NewTransparentPage(
              key: state.pageKey,
              child: CloudGroupPageScope(
                id: CloudGroupPageScope.scopeId,
                child: ModalRouteHost(
                  dialogBuilder: (ctx) => BlocProvider.value(
                    value: ctx.read<CoporFormBloc>(),
                    child: EditCloudGroupPage(id: id),
                  ),
                ),
              ),
            );
          },
        ),
      ],
    ),
  ];
}
