import 'package:json_annotation/json_annotation.dart';

part 'forgot_password_username_dto.g.dart';

@JsonSerializable()
class ForgotPasswordUsernameDTO {
  final String userName;

  ForgotPasswordUsernameDTO({required this.userName});

  factory ForgotPasswordUsernameDTO.fromJson(Map<String, dynamic> json) =>
      _$ForgotPasswordUsernameDTOFromJson(json);

  Map<String, dynamic> toJson() => _$ForgotPasswordUsernameDTOToJson(this);
}
