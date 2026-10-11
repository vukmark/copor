// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'forgot_password_code_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ForgotPasswordCodeDTO _$ForgotPasswordCodeDTOFromJson(
  Map<String, dynamic> json,
) => ForgotPasswordCodeDTO(
  userName: json['userName'] as String,
  code: json['code'] as String,
);

Map<String, dynamic> _$ForgotPasswordCodeDTOToJson(
  ForgotPasswordCodeDTO instance,
) => <String, dynamic>{'userName': instance.userName, 'code': instance.code};
