// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'state_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StateModel _$StateModelFromJson(Map<String, dynamic> json) => StateModel(
  id: json['id'] as String,
  name: json['name'] as String,
  code: json['code'] as String,
  countryId: json['countryId'] as String,
  publishStatus: $enumDecode(_$PublishStatusEnumMap, json['publishStatus']),
);

Map<String, dynamic> _$StateModelToJson(StateModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'code': instance.code,
      'countryId': instance.countryId,
      'publishStatus': _$PublishStatusEnumMap[instance.publishStatus]!,
    };

const _$PublishStatusEnumMap = {
  PublishStatus.published: 'PUBLISHED',
  PublishStatus.unpublished: 'UNPUBLISHED',
  PublishStatus.draft: 'DRAFT',
};
