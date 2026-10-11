import 'package:copor_core/src/config/router/helper_pages/modal_route_host.dart';
import 'package:copor_core/src/config/router/helper_pages/new_transparent_page.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/scopes/administration_page_scope.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/utils/additional_page_builder.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_namespaces.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/administration_pages/administration_page.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/administration_pages/edit_administration_page.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class AdministrationRouteFactory {
  static List<RouteBase> createRoute({
    required String namespace,
    AdditionalPageBuilder? additionalPageBuilder,
    List<BlocProvider> Function()? additionalProvidersBuilder,
    bool useModalCreateRoute = false,
    bool useModalEditRoute = false,
  }) {
    final basePath = AdministrationNamespaces.getRoute(namespace);

    EditAdministrationPage editPageBuilder(
      String? id, {
      bool useModalShell = false,
      String? role,
    }) => EditAdministrationPage(
      namespace: namespace,
      id: id,
      useModalShell: useModalShell,
      role: role,
    );

    Widget createRouteChild(EditAdministrationPage page) {
      return ModalRouteHost(
        dialogBuilder: (ctx) => MultiBlocProvider(
          providers: [
            BlocProvider.value(value: ctx.read<CoporFormBloc>()),
            if (additionalProvidersBuilder != null) ...additionalProvidersBuilder(),
          ],
          child: page,
        ),
      );
    }

    return [
      GoRoute(
        path: basePath,
        pageBuilder: (context, state) {
          return NoAnimationPage(
            key: state.pageKey,
            child: AdministrationPageScope(
              id: namespace,
              additionalProvidersBuilder: additionalProvidersBuilder,
              child: AdministrationPage(namespace: namespace),
            ),
          );
        },
        routes: [
          ...[
            GoRoute(
              path: 'create',
              pageBuilder: (context, state) {
                final role = state.uri.queryParameters['role'];

                return NewTransparentPage(
                  key: state.pageKey,
                  child: AdministrationPageScope(
                    id: namespace,
                    isModal: true,
                    additionalProvidersBuilder: additionalProvidersBuilder,
                    child: useModalCreateRoute
                        ? createRouteChild(editPageBuilder(null, useModalShell: true, role: role))
                        : editPageBuilder(null, role: role),
                  ),
                );
              },
            ),
            if (namespace == AdministrationNamespaces.user)
              GoRoute(
                path: 'form/:id',
                pageBuilder: (context, state) {
                  final id = state.pathParameters['id'];

                  return NewTransparentPage(
                    key: state.pageKey,
                    child: AdministrationPageScope(
                      id: namespace,
                      isModal: true,
                      additionalProvidersBuilder: additionalProvidersBuilder,
                      child: useModalEditRoute
                          ? createRouteChild(editPageBuilder(id, useModalShell: true))
                          : editPageBuilder(id),
                    ),
                  );
                },
              ),
            GoRoute(
              path: 'edit/:id',
              pageBuilder: (context, state) {
                final id = state.pathParameters['id'];

                return NewTransparentPage(
                  key: state.pageKey,
                  child: AdministrationPageScope(
                    id: namespace,
                    isModal: true,
                    additionalProvidersBuilder: additionalProvidersBuilder,
                    child: useModalEditRoute
                        ? createRouteChild(editPageBuilder(id, useModalShell: true))
                        : editPageBuilder(id),
                  ),
                );
              },
            ),
          ],
          if (additionalPageBuilder != null)
            GoRoute(
              path: '${additionalPageBuilder.pageKey}/:id',
              pageBuilder: (context, state) {
                final id = state.pathParameters['id'];

                return NewTransparentPage(
                  key: state.pageKey,
                  child: AdministrationPageScope(
                    id: namespace,
                    isModal: true,
                    child: additionalPageBuilder.pageBuilder(id),
                  ),
                );
              },
            ),
        ],
      ),
    ];
  }
}
