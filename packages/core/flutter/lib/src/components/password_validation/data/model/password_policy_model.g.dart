// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'password_policy_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PasswordPolicyModel _$PasswordPolicyModelFromJson(Map<String, dynamic> json) =>
    PasswordPolicyModel(
      minPasswordLength: (json['minPasswordLength'] as num).toInt(),
      maxPasswordLength: (json['maxPasswordLength'] as num).toInt(),
      minLowercaseLetters: (json['minLowercaseLetters'] as num).toInt(),
      minUppercaseLetters: (json['minUppercaseLetters'] as num).toInt(),
      minDigits: (json['minDigits'] as num).toInt(),
      minSpecialCharacters: (json['minSpecialCharacters'] as num).toInt(),
      allowSpaces: json['allowSpaces'] as bool,
      disallowUsernameInPassword: json['disallowUsernameInPassword'] as bool,
      disallowEmailOrNameInPassword:
          json['disallowEmailOrNameInPassword'] as bool,
      blockCommonPasswords: json['blockCommonPasswords'] as bool,
      maxRepeatedCharacters: (json['maxRepeatedCharacters'] as num).toInt(),
      passwordHistoryCount: (json['passwordHistoryCount'] as num).toInt(),
      commonPasswords:
          (json['commonPasswords'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
    );

Map<String, dynamic> _$PasswordPolicyModelToJson(
  PasswordPolicyModel instance,
) => <String, dynamic>{
  'minPasswordLength': instance.minPasswordLength,
  'maxPasswordLength': instance.maxPasswordLength,
  'minLowercaseLetters': instance.minLowercaseLetters,
  'minUppercaseLetters': instance.minUppercaseLetters,
  'minDigits': instance.minDigits,
  'minSpecialCharacters': instance.minSpecialCharacters,
  'allowSpaces': instance.allowSpaces,
  'disallowUsernameInPassword': instance.disallowUsernameInPassword,
  'disallowEmailOrNameInPassword': instance.disallowEmailOrNameInPassword,
  'blockCommonPasswords': instance.blockCommonPasswords,
  'maxRepeatedCharacters': instance.maxRepeatedCharacters,
  'passwordHistoryCount': instance.passwordHistoryCount,
  'commonPasswords': instance.commonPasswords,
};
