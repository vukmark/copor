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

class ForgotPasswordCodeForm extends HookWidget {
  final LoginPageTranslation translation;
  final String userName;
  final void Function(String code) onCodeVerified;
  final VoidCallback onBack;

  const ForgotPasswordCodeForm({
    super.key,
    required this.translation,
    required this.userName,
    required this.onCodeVerified,
    required this.onBack,
  });

  Future<void> _onSubmit(BuildContext context, TextEditingController controller) async {
    final code = controller.text.trim();
    final bloc = context.read<ForgotPasswordBloc>();

    bloc.add(VerifyResetCode(userName: userName, code: code));

    final result = await bloc.stream.firstWhere((state) => !state.isLoading);

    if (result.failure != null) return;

    onCodeVerified(code);
  }

  @override
  Widget build(BuildContext context) {
    final codeController = useTextEditingController();
    useListenable(codeController);

    final dt = CoporTheme.of(context);
    final hasCode = codeController.text.trim().isNotEmpty;

    return DSPageWrapper.floating(
      isMobile: context.isMobile,
      children: [
        DTFloatingLayout(
          fillAvailableHeight: context.isMobile ? null : false,
          actionPosition: FloatingContainerActionPosition.bottom,
          title: translation.FORGOT_PASSWORD_CODE_TITLE,
          leading: DTButton.surface(
            icon: PhosphorIconsThin.caretLeft,
            label: translation.BACK,
            onPressed: onBack,
          ),
          trailing: BlocBuilder<ForgotPasswordBloc, ForgotPasswordState>(
            buildWhen: (prev, next) => prev.isLoading != next.isLoading,
            builder: (context, state) => DTButton.primary(
              label: translation.CONTINUE,
              semanticLabel: translation.CONTINUE,
              enabled: hasCode && !state.isLoading,
              onPressed: () => _onSubmit(context, codeController),
            ),
          ),
          children: [
            Text(translation.FORGOT_PASSWORD_CODE_SENT_MESSAGE, style: dt.text.body),
            const SizedBox(height: 10),
            Text(translation.FORGOT_PASSWORD_CODE_EXPIRATION_MESSAGE, style: dt.text.bodySecondary),
            SizedBox(height: 10),
            DTInputField(
              controller: codeController,
              label: translation.VERIFICATION_CODE,
              autocorrect: false,
              enableSuggestions: false,
              textInputAction: TextInputAction.done,
              onContinuePressed: () {
                if (hasCode) _onSubmit(context, codeController);
              },
            ),
            const SizedBox(height: 10),
          ],
        ),
      ],
    );
  }
}
