// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'language_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LanguageModel _$LanguageModelFromJson(Map<String, dynamic> json) =>
    LanguageModel(
      id: json['id'] as String,
      name: json['name'] as String,
      code: json['code'] as String,
      nativeName: json['nativeName'] as String,
      publishStatus: $enumDecode(_$PublishStatusEnumMap, json['publishStatus']),
    );

Map<String, dynamic> _$LanguageModelToJson(LanguageModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'code': instance.code,
      'nativeName': instance.nativeName,
      'publishStatus': _$PublishStatusEnumMap[instance.publishStatus]!,
    };

const _$PublishStatusEnumMap = {
  PublishStatus.published: 'PUBLISHED',
  PublishStatus.unpublished: 'UNPUBLISHED',
  PublishStatus.draft: 'DRAFT',
};
