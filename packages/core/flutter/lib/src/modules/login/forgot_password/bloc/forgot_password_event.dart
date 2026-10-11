import 'package:equatable/equatable.dart';

sealed class ForgotPasswordEvent extends Equatable {
  const ForgotPasswordEvent();

  @override
  List<Object?> get props => [];
}

class SendResetCode extends ForgotPasswordEvent {
  final String userName;

  const SendResetCode({required this.userName});

  @override
  List<Object?> get props => [userName];
}

class VerifyResetCode extends ForgotPasswordEvent {
  final String userName;
  final String code;

  const VerifyResetCode({required this.userName, required this.code});

  @override
  List<Object?> get props => [userName, code];
}

class SetNewPassword extends ForgotPasswordEvent {
  final String userName;
  final String code;
  final String newPassword;

  const SetNewPassword({required this.userName, required this.code, required this.newPassword});

  @override
  List<Object?> get props => [userName, code, newPassword];
}
