import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/login/forgot_password/presentation/forgot_password_code_form.dart';
import 'package:copor_core/src/modules/login/forgot_password/presentation/forgot_password_new_password_form.dart';
import 'package:copor_core/src/modules/login/forgot_password/presentation/forgot_password_username_form.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

enum _Step { userName, code, newPassword }

class ForgotPasswordPage extends StatelessWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    return GuardedBlocBuilder<
      TranslationBloc<LoginPageTranslation>,
      TranslationState<LoginPageTranslation>
    >(
      builder: (context, translationState) {
        return _ForgotPasswordPageContent(translation: translationState.ensuredData);
      },
    );
  }
}

class _ForgotPasswordPageContent extends HookWidget {
  final LoginPageTranslation translation;

  const _ForgotPasswordPageContent({required this.translation});

  @override
  Widget build(BuildContext context) {
    final step = useState(_Step.userName);
    final userName = useRef('');
    final code = useRef('');

    void onPasswordChanged() {
      BlocReactions.common.addSuccessToScaffold(
        context,
        translation.PASSWORD_CHANGED_SUCCESSFULLY,
        'forgot_password_success',
      );
      goToPage(AppRoutes.login);
    }

    Widget buildContent() => switch (step.value) {
      _Step.userName => ForgotPasswordUsernameForm(
        translation: translation,
        onCodeSent: (value) {
          userName.value = value;
          step.value = _Step.code;
        },
      ),
      _Step.code => ForgotPasswordCodeForm(
        translation: translation,
        userName: userName.value,
        onCodeVerified: (value) {
          code.value = value;
          step.value = _Step.newPassword;
        },
        onBack: () => step.value = _Step.userName,
      ),
      _Step.newPassword => ForgotPasswordNewPasswordForm(
        translation: translation,
        userName: userName.value,
        code: code.value,
        onPasswordChanged: onPasswordChanged,
        onBack: () => step.value = _Step.code,
      ),
    };

    return DTStepContent(stepIndex: step.value.index, child: buildContent());
  }
}
