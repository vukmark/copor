// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_state_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateStateDTO _$CreateStateDTOFromJson(Map<String, dynamic> json) =>
    CreateStateDTO(
      name: json['name'] as String,
      code: json['code'] as String,
      countryId: json['countryId'] as String,
      publishStatus: $enumDecodeNullable(
        _$PublishStatusEnumMap,
        json['publishStatus'],
      ),
    );

Map<String, dynamic> _$CreateStateDTOToJson(CreateStateDTO instance) =>
    <String, dynamic>{
      'name': instance.name,
      'code': instance.code,
      'countryId': instance.countryId,
      'publishStatus': _$PublishStatusEnumMap[instance.publishStatus],
    };

const _$PublishStatusEnumMap = {
  PublishStatus.published: 'PUBLISHED',
  PublishStatus.unpublished: 'UNPUBLISHED',
  PublishStatus.draft: 'DRAFT',
};
