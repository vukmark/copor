import 'package:json_annotation/json_annotation.dart';

part 'verify_registration_dto.g.dart';

@JsonSerializable(createFactory: false)
class VerifyRegistrationDTO {
  final String email;
  final String code;

  const VerifyRegistrationDTO({required this.email, required this.code});

  Map<String, dynamic> toJson() => _$VerifyRegistrationDTOToJson(this);
}
