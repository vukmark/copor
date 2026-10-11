// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'password_validation_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PasswordValidationModel _$PasswordValidationModelFromJson(
  Map<String, dynamic> json,
) => PasswordValidationModel(
  password: json['password'] as String?,
  confirmPassword: json['confirmPassword'] as String?,
  userName: json['userName'] as String?,
  email: json['email'] as String?,
  firstName: json['firstName'] as String?,
  lastName: json['lastName'] as String?,
);

Map<String, dynamic> _$PasswordValidationModelToJson(
  PasswordValidationModel instance,
) => <String, dynamic>{
  'password': instance.password,
  'confirmPassword': instance.confirmPassword,
  'userName': instance.userName,
  'email': instance.email,
  'firstName': instance.firstName,
  'lastName': instance.lastName,
};
