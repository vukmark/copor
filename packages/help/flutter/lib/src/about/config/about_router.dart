import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_help/src/config/help_routes.dart';
import 'package:copor_help/src/about/bloc/about_cubit.dart';
import 'package:copor_help/src/about/bloc/about_state.dart';
import 'package:copor_help/src/about/config/about_page_keys.dart';
import 'package:copor_help/src/about/presentation/about_module_root.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createAboutRoute() {
  return StatefulShellBranch(
    routes: [
      ShellRoute(
        builder: (context, state, child) {
          return BlocProvider<AboutCubit>(
            create: (ctx) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                ctx.getBloc.appScaffold.addRequestLoading(AboutPageKeys.changeLogInfoLoadingKey);
              });
              return AboutCubit()..load();
            },
            child: BlocListener<AboutCubit, AboutState>(
              listenWhen: (_, curr) => curr is AboutLoaded || curr is AboutError,
              listener: (ctx, _) => ctx.getBloc.appScaffold.removeLoadingSource(
                AboutPageKeys.changeLogInfoLoadingKey,
              ),
              child: child,
            ),
          );
        },
        routes: [
          GoRoute(
            path: HelpRoutes.about,
            pageBuilder: (context, state) => const NoAnimationPage(child: AboutModuleRoot()),
          ),
        ],
      ),
    ],
  );
}
