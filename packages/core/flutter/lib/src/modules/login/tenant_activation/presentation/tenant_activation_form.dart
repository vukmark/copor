import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class TenantActivationForm extends HookWidget {
  final bool useModalShell;

  const TenantActivationForm({super.key, this.useModalShell = false});

  @override
  Widget build(BuildContext context) {
    final showForm = useState(false);
    final formKey = useMemoized(() => GlobalKey<FormState>());

    const namespace = '/tenant/activation';

    if (showForm.value) {
      CoporFormEventDispatcher.coporForm.getPublicCoporForm(namespace);
      return GuardedBlocBuilder<TranslationBloc<RegistrationPageTranslation>, TranslationState>(
        builder: (context, state) {
          final translation = context
              .read<TranslationBloc<RegistrationPageTranslation>>()
              .state
              .ensuredData;
          return BlocSelector<CoporFormBloc, CoporFormState, bool>(
            selector: (state) => state.result == null,
            builder: (context, isInitialLoad) => DTModalShell(
              isMobile: context.isMobile,
              isLoading: isInitialLoad,
              builder: (context) => DTFullFormConnector(
                isPublicForm: true,
                formKey: formKey,
                editTitle: translation.TENANT_ACTIVATION,
                createTitle: translation.TENANT_ACTIVATION,
                onCancel: goBack,
                saveLabel: translation.CONTINUE,
                cancelLabel: translation.CANCEL,
              ),
            ),
          );
        },
      );
    }

    return GuardedBlocBuilder<TranslationBloc<RegistrationPageTranslation>, TranslationState>(
      builder: (context, state) {
        final translation = context
            .read<TranslationBloc<RegistrationPageTranslation>>()
            .state
            .ensuredData;
        return DSPageWrapper.floating(
          isMobile: context.isMobile,
          children: [
            DTFloatingLayout(
              actionPosition: FloatingContainerActionPosition.bottom,
              title: translation.TENANT_ACTIVATION_TITLE,
              leading: DTButton.surface(
                icon: PhosphorIconsThin.caretLeft,
                label: translation.CANCEL,
                onPressed: goBack,
              ),
              trailing: DTButton.positive(
                label: translation.CONTINUE,
                onPressed: () => showForm.value = true,
                semanticLabel: translation.CONTINUE,
              ),
              children: [
                Text(
                  translation.TENANT_ACTIVATION_WELCOME_TITLE +
                      translation.TENANT_ACTIVATION_WELCOME_INTRO,
                  style: CoporTheme.of(context).text.body,
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
