// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'filter_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FilterModel _$FilterModelFromJson(Map<String, dynamic> json) => FilterModel(
  name: FilterName.fromJson(json['name'] as Map<String, dynamic>),
  type: $enumDecode(_$FilterTypeEnumMap, json['type']),
  values: (json['values'] as List<dynamic>?)
      ?.map((e) => FilterValue.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$FilterModelToJson(FilterModel instance) =>
    <String, dynamic>{
      'name': instance.name,
      'type': _$FilterTypeEnumMap[instance.type]!,
      'values': instance.values,
    };

const _$FilterTypeEnumMap = {
  FilterType.SEARCH: 'SEARCH',
  FilterType.SORT: 'SORT',
  FilterType.IN: 'IN',
};
