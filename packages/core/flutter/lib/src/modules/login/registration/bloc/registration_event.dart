import 'package:equatable/equatable.dart';

sealed class RegistrationEvent extends Equatable {
  const RegistrationEvent();

  @override
  List<Object?> get props => [];
}

class SubmitRegistration extends RegistrationEvent {
  final String firstName;
  final String lastName;
  final String email;
  final String userName;
  final String password;

  const SubmitRegistration({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.userName,
    required this.password,
  });

  @override
  List<Object?> get props => [firstName, lastName, email, userName, password];
}

class VerifyRegistrationCode extends RegistrationEvent {
  final String email;
  final String code;

  const VerifyRegistrationCode({required this.email, required this.code});

  @override
  List<Object?> get props => [email, code];
}

class ResendRegistrationCode extends RegistrationEvent {
  final String email;

  const ResendRegistrationCode({required this.email});

  @override
  List<Object?> get props => [email];
}
