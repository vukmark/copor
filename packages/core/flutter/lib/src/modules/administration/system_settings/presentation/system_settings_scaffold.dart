import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_back_button.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_cancel_button.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class SystemSettingsScaffold implements DSPageDrawer, DSAppBarTitle, DSAppBarLeading {
  final GoRouterState _currentRoute;

  SystemSettingsScaffold(this._currentRoute);

  @override
  Widget getLeading() {
    final currentRoute = _currentRoute.fullPath;
    if (currentRoute == AppRoutes.systemSettingsForm) {
      return AppBarCancelButton(onPressed: () => goToPage(AppRoutes.systemSettings));
    }
    return AppBarBackButton(onPressed: () => goToPage(AppRoutes.administrationDashboard));
  }

  @override
  Widget getTitle() {
    return BlocBuilder<TranslationBloc<CommonTranslation>, TranslationState<CommonTranslation>>(
      builder: (context, state) {
        if (!state.isInitial && !state.isLoading) {
          return Text(context.getState.commonTranslation.ensuredData.SYSTEM_SETTINGS);
        }
        return const SizedBox.shrink();
      },
    );
  }
}
