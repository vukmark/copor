// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'country_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CountryModel _$CountryModelFromJson(Map<String, dynamic> json) => CountryModel(
  id: json['id'] as String,
  name: json['name'] as String,
  code: json['code'] as String,
  publishStatus: $enumDecode(_$PublishStatusEnumMap, json['publishStatus']),
  stateList: CountryModel._stateListFromJson(json['stateList'] as List?),
);

Map<String, dynamic> _$CountryModelToJson(CountryModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'code': instance.code,
      'publishStatus': _$PublishStatusEnumMap[instance.publishStatus]!,
      'stateList': CountryModel._stateListToJson(instance.stateList),
    };

const _$PublishStatusEnumMap = {
  PublishStatus.published: 'PUBLISHED',
  PublishStatus.unpublished: 'UNPUBLISHED',
  PublishStatus.draft: 'DRAFT',
};
