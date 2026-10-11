// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'config_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConfigModel _$ConfigModelFromJson(Map<String, dynamic> json) => ConfigModel(
  baseUrl: json['baseUrl'] as String,
  isUserRemembered: json['isUserRemembered'] as bool,
  isServerRemembered: json['isServerRemembered'] as bool,
  language: LanguageModel.fromJson(json['language'] as Map<String, dynamic>),
  isServerUrlNotSet: json['isServerUrlNotSet'] as bool,
  version: json['version'] as String,
  webSocketUrl: json['webSocketUrl'] as String,
);

Map<String, dynamic> _$ConfigModelToJson(ConfigModel instance) =>
    <String, dynamic>{
      'baseUrl': instance.baseUrl,
      'isUserRemembered': instance.isUserRemembered,
      'isServerRemembered': instance.isServerRemembered,
      'isServerUrlNotSet': instance.isServerUrlNotSet,
      'language': LanguageModel.toJsonStatic(instance.language),
      'version': instance.version,
      'webSocketUrl': instance.webSocketUrl,
    };
