import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_event.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_validation_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class PasswordValidationBlocEventDispatcher {
  static _PasswordValidation passwordValidation = _PasswordValidation();
}

typedef PasswordValidationContext = ({
  String? userName,
  String? email,
  String? firstName,
  String? lastName,
});

class _PasswordValidation {
  void validatePassword(PasswordValidationBloc bloc, PasswordValidationModel body) {
    bloc.add(ValidatePassword(body));
  }

  void loadPolicy(PasswordValidationBloc bloc) {
    bloc.add(const LoadPasswordPolicy());
  }

  VoidCallback listenToPasswordControllers(
    BuildContext context,
    TextEditingController passwordController,
    TextEditingController confirmController, {
    PasswordValidationContext Function()? context$,
  }) {
    final bloc = context.read<PasswordValidationBloc>();
    bloc.add(ResetPasswordValidation());
    bloc.add(const LoadPasswordPolicy());

    String previousPassword = passwordController.text;
    String previousConfirmPassword = confirmController.text;

    void onChanged() {
      if (passwordController.text == previousPassword &&
          confirmController.text == previousConfirmPassword) {
        return;
      }

      previousPassword = passwordController.text;
      previousConfirmPassword = confirmController.text;

      if (passwordController.text.isEmpty && confirmController.text.isEmpty) {
        bloc.add(ResetPasswordValidation());
        return;
      }

      final identity = context$?.call();

      bloc.add(
        ValidatePassword(
          PasswordValidationModel(
            password: passwordController.text,
            confirmPassword: confirmController.text,
            userName: identity?.userName,
            email: identity?.email,
            firstName: identity?.firstName,
            lastName: identity?.lastName,
          ),
        ),
      );
    }

    passwordController.addListener(onChanged);
    confirmController.addListener(onChanged);

    return () {
      passwordController.removeListener(onChanged);
      confirmController.removeListener(onChanged);
    };
  }
}
