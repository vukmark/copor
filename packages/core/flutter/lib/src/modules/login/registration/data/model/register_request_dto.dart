import 'package:json_annotation/json_annotation.dart';

part 'register_request_dto.g.dart';

@JsonSerializable(createFactory: false)
class RegisterRequestDTO {
  final String firstName;
  final String lastName;
  final String email;
  final String userName;
  final String password;

  const RegisterRequestDTO({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.userName,
    required this.password,
  });

  Map<String, dynamic> toJson() => _$RegisterRequestDTOToJson(this);
}
