// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'authorization_tokens_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AuthorizationTokensModel _$AuthorizationTokensModelFromJson(
  Map<String, dynamic> json,
) => AuthorizationTokensModel(
  authToken: json['authToken'] as String,
  refreshToken: json['refreshToken'] as String,
  message: json['message'] as String?,
  redirect: json['redirect'] as String?,
);

Map<String, dynamic> _$AuthorizationTokensModelToJson(
  AuthorizationTokensModel instance,
) => <String, dynamic>{
  'authToken': instance.authToken,
  'refreshToken': instance.refreshToken,
  'message': instance.message,
  'redirect': instance.redirect,
};
