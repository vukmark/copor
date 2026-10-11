// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'filter_model_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FilterModelDTO _$FilterModelDTOFromJson(Map<String, dynamic> json) =>
    FilterModelDTO(
      name: json['name'] as String,
      values: (json['values'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$FilterModelDTOToJson(FilterModelDTO instance) =>
    <String, dynamic>{'name': instance.name, 'values': instance.values};
