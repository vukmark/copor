// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'country_item_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CountryItemModel _$CountryItemModelFromJson(Map<String, dynamic> json) =>
    CountryItemModel(
      id: json['id'] as String,
      name: json['name'] as String,
      code: json['code'] as String,
      publishStatus: $enumDecode(_$PublishStatusEnumMap, json['publishStatus']),
    );

Map<String, dynamic> _$CountryItemModelToJson(CountryItemModel instance) =>
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
