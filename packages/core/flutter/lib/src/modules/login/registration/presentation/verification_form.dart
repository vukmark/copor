import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
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

/// Step 2: enter the 6-digit code that was e-mailed, or ask for a new one.
class VerificationForm extends HookWidget {
  final RegistrationPageTranslation translation;
  final String email;
  final VoidCallback onVerified;
  final VoidCallback onBack;

  const VerificationForm({
    super.key,
    required this.translation,
    required this.email,
    required this.onVerified,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    final codeController = useTextEditingController();
    useListenable(codeController);

    final dt = CoporTheme.of(context);
    final hasCode = codeController.text.trim().isNotEmpty;

    Future<void> verify() async {
      final bloc = context.read<RegistrationBloc>();

      bloc.add(VerifyRegistrationCode(email: email, code: codeController.text.trim()));

      final result = await bloc.stream.firstWhere((state) => !state.isLoading);

      if (result.failure != null) return;

      onVerified();
    }

    Future<void> resend() async {
      final bloc = context.read<RegistrationBloc>();

      bloc.add(ResendRegistrationCode(email: email));

      final result = await bloc.stream.firstWhere((state) => !state.isLoading);

      if (result.failure != null || !context.mounted) return;

      BlocReactions.common.addSuccessToScaffold(
        context,
        translation.CODE_RESENT,
        'registration_code_resent',
      );
    }

    return DSPageWrapper.floating(
      isMobile: context.isMobile,
      children: [
        DTFloatingLayout(
          fillAvailableHeight: context.isMobile ? null : false,
          actionPosition: FloatingContainerActionPosition.bottom,
          title: translation.VERIFY_EMAIL_TITLE,
          leading: DTButton.surface(
            icon: PhosphorIconsThin.caretLeft,
            label: translation.BACK,
            onPressed: onBack,
          ),
          trailing: BlocBuilder<RegistrationBloc, RegistrationState>(
            buildWhen: (prev, next) => prev.isLoading != next.isLoading,
            builder: (context, state) => DTButton.positive(
              label: translation.VERIFY,
              semanticLabel: translation.VERIFY,
              enabled: hasCode && !state.isLoading,
              onPressed: verify,
            ),
          ),
          children: [
            Text(
              translation.VERIFICATION_CODE_SENT_MESSAGE.replaceAll('{{email}}', email),
              style: dt.text.body,
            ),
            const SizedBox(height: 10),
            Text(translation.VERIFICATION_CODE_EXPIRATION_MESSAGE, style: dt.text.bodySecondary),
            const SizedBox(height: 10),
            DTInputField(
              controller: codeController,
              label: translation.VERIFICATION_CODE,
              keyboardType: TextInputType.number,
              autofillHints: const [AutofillHints.oneTimeCode],
              autocorrect: false,
              enableSuggestions: false,
              textInputAction: TextInputAction.done,
              onContinuePressed: () {
                if (hasCode) verify();
              },
            ),
            const SizedBox(height: 10),
            BlocBuilder<RegistrationBloc, RegistrationState>(
              buildWhen: (prev, next) => prev.isLoading != next.isLoading,
              builder: (context, state) => DTButton.surface(
                label: translation.RESEND_CODE,
                enabled: !state.isLoading,
                onPressed: resend,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
