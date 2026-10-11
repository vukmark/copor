import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/login/contract_sign/data/model/translation/contract_sign_translation.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';

class ContractSignPage extends HookWidget {
  final String? endpoint;

  const ContractSignPage({super.key, this.endpoint});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());

    final endpoint = context.read<AuthorizationBloc>().state.result?.data.redirect;

    CoporFormEventDispatcher.coporForm.getCoporForm(endpoint!);

    return GuardedBlocBuilder<CoporFormBloc, CoporFormState>(
      initialPlaceholder: Center(child: Container()),
      loadingPlaceholder: Center(child: Container()),
      errorPlaceholderBuilder: (context, state, failure) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          context.getBloc.appScaffold.addBanner(
            DSBanner.error(failure.message, source: 'contract_sign_error'),
          );
          context.go(AppRoutes.login);
        });
        return Center(child: Container());
      },
      builder: (context, _) {
        final translationState = context
            .watch<TranslationBloc<ContractSignPageTranslation>>()
            .state;

        if (BlocStateConditions.hasInitialStates([translationState])) {
          return Center(child: Container());
        }

        final signContractTitle = translationState.ensuredData.SIGN_CONTRACT;
        final commonTranslation = context.getState.commonTranslation.ensuredData;

        return DSPageWrapper.floating(
          scrollable: false,
          isMobile: context.isMobile,
          children: [
            DTFullFormConnector(
              formKey: formKey,
              icon: PhosphorIconsThin.signature,
              createTitle: signContractTitle,
              editTitle: signContractTitle,
              saveLabel: commonTranslation.SAVE,
              cancelLabel: commonTranslation.CANCEL,
              isFormReady: (_) => true,
              onCancel: () {
                BlocEventDispatcher.authorization.logout(
                  context.getBloc.authorization,
                  context.getBloc.accountInfo,
                  context.getBloc.webSocket,
                );
              },
            ),
          ],
        );
      },
    );
  }
}
