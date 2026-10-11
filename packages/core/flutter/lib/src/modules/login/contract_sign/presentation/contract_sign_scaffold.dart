import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_cancel_button.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/config/dispatcher.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../config/dependency_injection.dart';

class ContractSignScaffold implements DSPageDrawer, DSAppBarTitle, DSAppBarLeading {
  const ContractSignScaffold();

  @override
  Widget getLeading() {
    return Builder(
      builder: (context) {
        return AppBarCancelButton(
          onPressed: () {
            getIt<Dispatcher>().go(AppRoutes.login);
            BlocEventDispatcher.authorization.logout(
              context.getBloc.authorization,
              context.getBloc.accountInfo,
              context.getBloc.webSocket,
            );
          },
        );
      },
    );
  }

  @override
  Widget getTitle() {
    return BlocBuilder<TranslationBloc<CommonTranslation>, TranslationState<CommonTranslation>>(
      builder: (context, state) {
        if (!state.isInitial && !state.isLoading) {
          return Text(context.getState.commonTranslation.ensuredData.LOGIN);
        }
        return const SizedBox.shrink();
      },
    );
  }
}
