import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/config/router/routes.dart';
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

class ForgotPasswordUsernameForm extends HookWidget {
  final LoginPageTranslation translation;
  final void Function(String userName) onCodeSent;

  const ForgotPasswordUsernameForm({
    super.key,
    required this.translation,
    required this.onCodeSent,
  });

  Future<void> _onSubmit(BuildContext context, TextEditingController controller) async {
    final userName = controller.text.trim();
    final bloc = context.read<ForgotPasswordBloc>();

    bloc.add(SendResetCode(userName: userName));

    final result = await bloc.stream.firstWhere((state) => !state.isLoading);

    if (result.failure != null) return;

    onCodeSent(userName);
  }

  @override
  Widget build(BuildContext context) {
    final usernameController = useTextEditingController();
    useListenable(usernameController);

    final hasUsername = usernameController.text.trim().isNotEmpty;

    return DSPageWrapper.floating(
      isMobile: context.isMobile,
      children: [
        DTFloatingLayout(
          fillAvailableHeight: context.isMobile ? null : false,
          actionPosition: FloatingContainerActionPosition.bottom,
          title: translation.FORGOT_PASSWORD_TITLE,
          leading: DTButton.surface(
            icon: PhosphorIconsThin.caretLeft,
            label: translation.CANCEL,
            onPressed: () => goToPage(AppRoutes.login),
          ),
          trailing: BlocBuilder<ForgotPasswordBloc, ForgotPasswordState>(
            buildWhen: (prev, next) => prev.isLoading != next.isLoading,
            builder: (context, state) => DTButton.positive(
              label: translation.CONTINUE,
              semanticLabel: translation.CONTINUE,
              enabled: hasUsername && !state.isLoading,
              onPressed: () => _onSubmit(context, usernameController),
            ),
          ),
          children: [
            Text(
              translation.FORGOT_PASSWORD_USERNAME_MESSAGE,
              style: CoporTheme.of(context).text.body,
            ),
            SizedBox(height: 15),
            DTInputField(
              controller: usernameController,
              label: translation.USERNAME,
              autofillHints: const [AutofillHints.username],
              autocorrect: false,
              enableSuggestions: false,
              textInputAction: TextInputAction.done,
              onContinuePressed: () {
                if (hasUsername) _onSubmit(context, usernameController);
              },
            ),
            const SizedBox(height: 10),
          ],
        ),
      ],
    );
  }
}
