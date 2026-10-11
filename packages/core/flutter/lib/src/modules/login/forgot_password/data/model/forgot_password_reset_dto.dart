import 'package:json_annotation/json_annotation.dart';

part 'forgot_password_reset_dto.g.dart';

@JsonSerializable()
class ForgotPasswordResetDTO {
  final String userName;
  final String code;
  final String newPassword;

  ForgotPasswordResetDTO({required this.userName, required this.code, required this.newPassword});

  factory ForgotPasswordResetDTO.fromJson(Map<String, dynamic> json) =>
      _$ForgotPasswordResetDTOFromJson(json);

  Map<String, dynamic> toJson() => _$ForgotPasswordResetDTOToJson(this);
}
