import 'package:json_annotation/json_annotation.dart';

part 'forgot_password_code_dto.g.dart';

@JsonSerializable()
class ForgotPasswordCodeDTO {
  final String userName;
  final String code;

  ForgotPasswordCodeDTO({required this.userName, required this.code});

  factory ForgotPasswordCodeDTO.fromJson(Map<String, dynamic> json) =>
      _$ForgotPasswordCodeDTOFromJson(json);

  Map<String, dynamic> toJson() => _$ForgotPasswordCodeDTOToJson(this);
}
