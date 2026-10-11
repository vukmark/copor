// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'forgot_password_reset_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ForgotPasswordResetDTO _$ForgotPasswordResetDTOFromJson(
  Map<String, dynamic> json,
) => ForgotPasswordResetDTO(
  userName: json['userName'] as String,
  code: json['code'] as String,
  newPassword: json['newPassword'] as String,
);

Map<String, dynamic> _$ForgotPasswordResetDTOToJson(
  ForgotPasswordResetDTO instance,
) => <String, dynamic>{
  'userName': instance.userName,
  'code': instance.code,
  'newPassword': instance.newPassword,
};
