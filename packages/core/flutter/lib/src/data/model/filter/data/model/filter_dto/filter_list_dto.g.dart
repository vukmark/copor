// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'filter_list_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FilterListDTO _$FilterListDTOFromJson(Map<String, dynamic> json) =>
    FilterListDTO(
      filterList: (json['filterList'] as List<dynamic>)
          .map((e) => FilterModelDTO.fromJson(e as Map<String, dynamic>))
          .toList(),
      limit: json['limit'] as String,
      offset: json['offset'] as String,
    );

Map<String, dynamic> _$FilterListDTOToJson(FilterListDTO instance) =>
    <String, dynamic>{
      'filterList': instance.filterList,
      'limit': instance.limit,
      'offset': instance.offset,
    };
