import 'package:json_annotation/json_annotation.dart';

part 'resend_registration_code_dto.g.dart';

@JsonSerializable(createFactory: false)
class ResendRegistrationCodeDTO {
  final String email;

  const ResendRegistrationCodeDTO({required this.email});

  Map<String, dynamic> toJson() => _$ResendRegistrationCodeDTOToJson(this);
}
