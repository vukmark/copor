import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/modules/login/registration/presentation/registration_form.dart';
import 'package:copor_core/src/modules/login/registration/presentation/verification_form.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

enum _Step { details, verification }

/// Self-registration: account details, then the e-mailed verification code.
class RegistrationPage extends StatelessWidget {
  const RegistrationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return GuardedBlocBuilder<
      TranslationBloc<RegistrationPageTranslation>,
      TranslationState<RegistrationPageTranslation>
    >(
      builder: (context, translationState) {
        return _RegistrationPageContent(translation: translationState.ensuredData);
      },
    );
  }
}

class _RegistrationPageContent extends HookWidget {
  final RegistrationPageTranslation translation;

  const _RegistrationPageContent({required this.translation});

  @override
  Widget build(BuildContext context) {
    final step = useState(_Step.details);
    final email = useRef('');

    void onVerified() {
      BlocReactions.common.addSuccessToScaffold(
        context,
        translation.REGISTRATION_SUCCESSFUL,
        'registration_success',
      );
      goToPage(AppRoutes.login);
    }

    Widget buildContent() => switch (step.value) {
      _Step.details => RegistrationForm(
        translation: translation,
        onRegistered: (value) {
          email.value = value;
          step.value = _Step.verification;
        },
      ),
      _Step.verification => VerificationForm(
        translation: translation,
        email: email.value,
        onVerified: onVerified,
        onBack: () => step.value = _Step.details,
      ),
    };

    return DTStepContent(stepIndex: step.value.index, child: buildContent());
  }
}
