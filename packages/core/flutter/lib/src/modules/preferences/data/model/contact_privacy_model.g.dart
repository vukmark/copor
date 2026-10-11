// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contact_privacy_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ContactPrivacyModel _$ContactPrivacyModelFromJson(Map<String, dynamic> json) =>
    ContactPrivacyModel(
      picture: json['picture'] as bool,
      email: json['email'] as bool,
      dateOfBirth: json['dateOfBirth'] as bool,
      tenant: json['tenant'] as bool,
      group: json['group'] as bool,
      private: json['private'] as bool,
    );

Map<String, dynamic> _$ContactPrivacyModelToJson(
  ContactPrivacyModel instance,
) => <String, dynamic>{
  'picture': instance.picture,
  'email': instance.email,
  'dateOfBirth': instance.dateOfBirth,
  'tenant': instance.tenant,
  'group': instance.group,
  'private': instance.private,
};
