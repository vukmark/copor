// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'authentication_type_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AuthenticationTypeModel _$AuthenticationTypeModelFromJson(
  Map<String, dynamic> json,
) => AuthenticationTypeModel(
  faceId: json['faceId'] as bool,
  fingerprint: json['fingerprint'] as bool,
  lockAppId: json['lockAppId'] as bool,
);

Map<String, dynamic> _$AuthenticationTypeModelToJson(
  AuthenticationTypeModel instance,
) => <String, dynamic>{
  'faceId': instance.faceId,
  'fingerprint': instance.fingerprint,
  'lockAppId': instance.lockAppId,
};
