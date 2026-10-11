import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_state.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_factory.dart';
import 'package:copor_core/src/components/password_validation/presentation/password_requirements_checklist.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_bloc.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_event.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_state.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class ForgotPasswordNewPasswordForm extends HookWidget {
  final LoginPageTranslation translation;
  final String userName;
  final String code;
  final VoidCallback onPasswordChanged;
  final VoidCallback onBack;

  const ForgotPasswordNewPasswordForm({
    super.key,
    required this.translation,
    required this.userName,
    required this.code,
    required this.onPasswordChanged,
    required this.onBack,
  });

  Future<void> _onSubmit(BuildContext context, String newPassword) async {
    final bloc = context.read<ForgotPasswordBloc>();

    bloc.add(SetNewPassword(userName: userName, code: code, newPassword: newPassword));

    final result = await bloc.stream.firstWhere((state) => !state.isLoading);

    if (result.failure != null) return;

    onPasswordChanged();
  }

  @override
  Widget build(BuildContext context) {
    final passwordValidationBloc = useMemoized(PasswordValidationBlocFactory.validatePassword);

    return BlocProvider.value(
      value: passwordValidationBloc,
      child: _ForgotPasswordNewPasswordFormBody(
        translation: translation,
        userName: userName,
        onSubmit: (context, newPassword) => _onSubmit(context, newPassword),
        onBack: onBack,
      ),
    );
  }
}

class _ForgotPasswordNewPasswordFormBody extends HookWidget {
  final LoginPageTranslation translation;
  final String userName;
  final Future<void> Function(BuildContext context, String newPassword) onSubmit;
  final VoidCallback onBack;

  const _ForgotPasswordNewPasswordFormBody({
    required this.translation,
    required this.userName,
    required this.onSubmit,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    final passwordController = useTextEditingController();
    final confirmPasswordController = useTextEditingController();
    useListenable(passwordController);
    useListenable(confirmPasswordController);

    useEffect(
      () => PasswordValidationBlocEventDispatcher.passwordValidation.listenToPasswordControllers(
        context,
        passwordController,
        confirmPasswordController,
        context$: () => (userName: userName, email: userName, firstName: null, lastName: null),
      ),
      [passwordController, confirmPasswordController],
    );

    final password = passwordController.text;
    final confirmPassword = confirmPasswordController.text;
    final isMismatch = confirmPassword.isNotEmpty && confirmPassword != password;

    return BlocBuilder<PasswordValidationBloc, PasswordValidationState>(
      builder: (context, validationState) {
        final canSubmit =
            password.isNotEmpty && confirmPassword == password && validationState.isValid;

        void submit() {
          if (canSubmit) onSubmit(context, password);
        }

        return DSPageWrapper.floating(
          isMobile: context.isMobile,
          children: [
            DTFloatingLayout(
              fillAvailableHeight: context.isMobile ? null : false,
              actionPosition: FloatingContainerActionPosition.bottom,
              title: translation.SET_NEW_PASSWORD_TITLE,
              leading: DTButton.surface(
                icon: PhosphorIconsThin.caretLeft,
                label: translation.BACK,
                onPressed: onBack,
              ),
              trailing: BlocBuilder<ForgotPasswordBloc, ForgotPasswordState>(
                buildWhen: (prev, next) => prev.isLoading != next.isLoading,
                builder: (context, state) => DTButton.positive(
                  label: translation.SUBMIT,
                  semanticLabel: translation.SUBMIT,
                  enabled: canSubmit && !state.isLoading,
                  onPressed: submit,
                ),
              ),
              children: [
                DTPasswordField(
                  controller: passwordController,
                  label: translation.NEW_PASSWORD,
                  autofillHints: const [AutofillHints.newPassword],
                  textInputAction: TextInputAction.next,
                ),
                DTPasswordField(
                  controller: confirmPasswordController,
                  label: translation.CONFIRM_PASSWORD,
                  autofillHints: const [AutofillHints.newPassword],
                  textInputAction: TextInputAction.done,
                  errorText: isMismatch ? translation.PASSWORDS_DO_NOT_MATCH : null,
                  onContinuePressed: submit,
                ),
                const PasswordRequirementsChecklist(),
                const SizedBox(height: 10),
              ],
            ),
          ],
        );
      },
    );
  }
}
