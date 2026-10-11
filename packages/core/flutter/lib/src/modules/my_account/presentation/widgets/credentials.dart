import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_factory.dart';
import 'package:copor_core/src/components/password_validation/presentation/password_requirements_checklist.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class Credentials extends StatelessWidget {
  final MyAccountPageTranslation translation;
  final AccountInfoModel accountInfo;

  const Credentials({super.key, required this.translation, required this.accountInfo});

  void _openEditDialog(BuildContext context) {
    final isMobile = context.isMobile;
    showDialog<void>(
      context: context,
      barrierDismissible: true,
      barrierColor: coporBarrierColor(context),
      builder: (ctx) => BlocProvider.value(
        value: PasswordValidationBlocFactory.validatePassword(),
        child: DTModalShell(
          isMobile: isMobile,
          builder: (_) => _EditPasswordDialog(translation: translation, accountInfo: accountInfo),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return DTInputDecorator.withAction(
      label: translation.CREDENTIALS,
      actionIcon: PhosphorIconsThin.pen,
      onAction: () => _openEditDialog(context),
      child: Column(
        children: [
          DTInlineLabelGroup(
            children: [
              DTInlineLabel(label: translation.USERNAME, value: accountInfo.username),
              DTInlineLabel(label: translation.PASSWORD, value: '••••••••••'),
            ],
          ),
        ],
      ),
    );
  }
}

class _EditPasswordDialog extends HookWidget {
  final MyAccountPageTranslation translation;
  final AccountInfoModel accountInfo;

  const _EditPasswordDialog({required this.translation, required this.accountInfo});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final currentPasswordController = useTextEditingController();
    final newPasswordController = useTextEditingController();
    final confirmPasswordController = useTextEditingController();
    final confirmPasswordError = useState<String?>(null);

    useEffect(
      () => PasswordValidationBlocEventDispatcher.passwordValidation.listenToPasswordControllers(
        context,
        newPasswordController,
        confirmPasswordController,
        context$: () => (
          userName: accountInfo.username,
          email: accountInfo.email,
          firstName: accountInfo.firstName,
          lastName: accountInfo.lastName,
        ),
      ),
      [newPasswordController, confirmPasswordController],
    );

    void onSubmit() {
      if (!formKey.currentState!.validate()) return;

      final newPassword = newPasswordController.text.trim();
      final confirmPassword = confirmPasswordController.text.trim();

      if (newPassword != confirmPassword) {
        confirmPasswordError.value = translation.PASSWORD_DO_NOT_MATCH;
        return;
      }
      confirmPasswordError.value = null;

      if (!context.read<PasswordValidationBloc>().state.isValid) return;

      BlocEventDispatcher.authorization.changePassword(
        context.read<AuthorizationBloc>(),
        currentPasswordController.text,
        newPassword,
      );
      Navigator.of(context, rootNavigator: true).pop();
    }

    return DTFloatingLayout(
      title: translation.EDIT_PASSWORD,
      icon: DTIcons.editInline,
      leading: DTButton.surface(
        label: translation.CANCEL,
        onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
      ),
      trailing: DTButton.positive(label: translation.SAVE, onPressed: onSubmit),
      children: [
        Form(
          key: formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DTPasswordField(
                controller: currentPasswordController,
                label: translation.OLD_PASSWORD,
                required: translation.FIELD_IS_REQUIRED,
              ),
              DTPasswordField(
                controller: newPasswordController,
                label: translation.NEW_PASSWORD,
                required: translation.FIELD_IS_REQUIRED,
                errorText: confirmPasswordError.value,
              ),
              DTPasswordField(
                controller: confirmPasswordController,
                label: translation.REPEAT_NEW_PASSWORD,
                required: translation.FIELD_IS_REQUIRED,
                errorText: confirmPasswordError.value,
              ),
              const PasswordRequirementsChecklist(),
            ],
          ),
        ),
      ],
    );
  }
}
