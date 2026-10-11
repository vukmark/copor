// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_country_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateCountryDTO _$CreateCountryDTOFromJson(Map<String, dynamic> json) =>
    CreateCountryDTO(
      id: json['id'] as String?,
      name: json['name'] as String,
      code: json['code'] as String,
      publishStatus: $enumDecode(_$PublishStatusEnumMap, json['publishStatus']),
    );

Map<String, dynamic> _$CreateCountryDTOToJson(CreateCountryDTO instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'code': instance.code,
      'publishStatus': _$PublishStatusEnumMap[instance.publishStatus]!,
    };

const _$PublishStatusEnumMap = {
  PublishStatus.published: 'PUBLISHED',
  PublishStatus.unpublished: 'UNPUBLISHED',
  PublishStatus.draft: 'DRAFT',
};
