import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_state.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_factory.dart';
import 'package:copor_core/src/components/password_validation/presentation/password_requirements_checklist.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_event.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_state.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

/// Step 1: name, e-mail, username and password. Field rules (e-mail in use,
/// username format/taken, password policy) are enforced by the backend; its
/// error messages arrive through the page's failure banner.
class RegistrationForm extends HookWidget {
  final RegistrationPageTranslation translation;
  final void Function(String email) onRegistered;

  const RegistrationForm({super.key, required this.translation, required this.onRegistered});

  @override
  Widget build(BuildContext context) {
    final passwordValidationBloc = useMemoized(PasswordValidationBlocFactory.validatePassword);

    return BlocProvider.value(
      value: passwordValidationBloc,
      child: _RegistrationFormBody(translation: translation, onRegistered: onRegistered),
    );
  }
}

class _RegistrationFormBody extends HookWidget {
  final RegistrationPageTranslation translation;
  final void Function(String email) onRegistered;

  const _RegistrationFormBody({required this.translation, required this.onRegistered});

  @override
  Widget build(BuildContext context) {
    final firstName = useTextEditingController();
    final lastName = useTextEditingController();
    final email = useTextEditingController();
    final userName = useTextEditingController();
    final password = useTextEditingController();
    final confirmPassword = useTextEditingController();
    for (final controller in [firstName, lastName, email, userName, password, confirmPassword]) {
      useListenable(controller);
    }

    useEffect(
      () => PasswordValidationBlocEventDispatcher.passwordValidation.listenToPasswordControllers(
        context,
        password,
        confirmPassword,
        context$: () => (
          userName: userName.text.trim(),
          email: email.text.trim(),
          firstName: firstName.text.trim(),
          lastName: lastName.text.trim(),
        ),
      ),
      [password, confirmPassword],
    );

    final isMismatch = confirmPassword.text.isNotEmpty && confirmPassword.text != password.text;
    final hasAllFields = [
      firstName,
      lastName,
      email,
      userName,
    ].every((controller) => controller.text.trim().isNotEmpty);

    Future<void> submit() async {
      final bloc = context.read<RegistrationBloc>();
      final emailValue = email.text.trim();

      bloc.add(
        SubmitRegistration(
          firstName: firstName.text.trim(),
          lastName: lastName.text.trim(),
          email: emailValue,
          userName: userName.text.trim(),
          password: password.text,
        ),
      );

      final result = await bloc.stream.firstWhere((state) => !state.isLoading);

      if (result.failure != null) return;

      onRegistered(emailValue);
    }

    return BlocBuilder<PasswordValidationBloc, PasswordValidationState>(
      builder: (context, validationState) {
        final canSubmit =
            hasAllFields &&
            password.text.isNotEmpty &&
            confirmPassword.text == password.text &&
            validationState.isValid;

        return DSPageWrapper.floating(
          isMobile: context.isMobile,
          children: [
            DTFloatingLayout(
              fillAvailableHeight: context.isMobile ? null : false,
              actionPosition: FloatingContainerActionPosition.bottom,
              title: translation.CREATE_AN_ACCOUNT,
              leading: DTButton.surface(
                icon: PhosphorIconsThin.caretLeft,
                label: translation.BACK,
                onPressed: goBack,
              ),
              trailing: BlocBuilder<RegistrationBloc, RegistrationState>(
                buildWhen: (prev, next) => prev.isLoading != next.isLoading,
                builder: (context, state) => DTButton.positive(
                  label: translation.CREATE_AN_ACCOUNT,
                  semanticLabel: translation.CREATE_AN_ACCOUNT,
                  enabled: canSubmit && !state.isLoading,
                  onPressed: submit,
                ),
              ),
              children: [
                DTInputField(
                  controller: firstName,
                  label: translation.FIRST_NAME,
                  autofillHints: const [AutofillHints.givenName],
                  textInputAction: TextInputAction.next,
                ),
                DTInputField(
                  controller: lastName,
                  label: translation.LAST_NAME,
                  autofillHints: const [AutofillHints.familyName],
                  textInputAction: TextInputAction.next,
                ),
                DTInputField(
                  controller: email,
                  label: translation.EMAIL,
                  keyboardType: TextInputType.emailAddress,
                  autofillHints: const [AutofillHints.email],
                  autocorrect: false,
                  enableSuggestions: false,
                  textInputAction: TextInputAction.next,
                ),
                DTInputField(
                  controller: userName,
                  label: translation.USERNAME,
                  helpContent: Text(translation.USERNAME_HINT),
                  autofillHints: const [AutofillHints.newUsername],
                  autocorrect: false,
                  enableSuggestions: false,
                  textInputAction: TextInputAction.next,
                ),
                DTPasswordField(
                  controller: password,
                  label: translation.PASSWORD,
                  autofillHints: const [AutofillHints.newPassword],
                  textInputAction: TextInputAction.next,
                ),
                DTPasswordField(
                  controller: confirmPassword,
                  label: translation.CONFIRM_PASSWORD,
                  autofillHints: const [AutofillHints.newPassword],
                  textInputAction: TextInputAction.done,
                  errorText: isMismatch ? translation.PASSWORDS_DO_NOT_MATCH : null,
                  onContinuePressed: () {
                    if (canSubmit) submit();
                  },
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
