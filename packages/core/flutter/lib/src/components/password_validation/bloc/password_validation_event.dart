import 'package:copor_core/src/components/password_validation/data/model/password_validation_model.dart';
import 'package:equatable/equatable.dart';

class PasswordValidationEvent extends Equatable {
  const PasswordValidationEvent();

  @override
  List<Object?> get props => [];
}

class ValidatePassword extends PasswordValidationEvent {
  final PasswordValidationModel body;

  const ValidatePassword(this.body);

  @override
  List<Object?> get props => [body];
}

class LoadPasswordPolicy extends PasswordValidationEvent {
  final bool force;

  const LoadPasswordPolicy({this.force = false});

  @override
  List<Object?> get props => [force];
}

class ResetPasswordValidation extends PasswordValidationEvent {}
