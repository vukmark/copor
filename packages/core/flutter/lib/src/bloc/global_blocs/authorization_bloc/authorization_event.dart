import 'package:equatable/equatable.dart';

sealed class AuthorizationEvent extends Equatable {
  const AuthorizationEvent();

  @override
  List<Object?> get props => [];
}

class Login extends AuthorizationEvent {
  final String username;
  final String password;

  const Login({required this.username, required this.password});
}

class GetTokens extends AuthorizationEvent {}

class Logout extends AuthorizationEvent {}

class ChangePassword extends AuthorizationEvent {
  final String oldPassword;
  final String newPassword;

  const ChangePassword({required this.oldPassword, required this.newPassword});
}

class ClearRedirect extends AuthorizationEvent {}

class RegisterValidationAndSubmitCallback extends AuthorizationEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class SavePasswordButtonPressed extends AuthorizationEvent {}
