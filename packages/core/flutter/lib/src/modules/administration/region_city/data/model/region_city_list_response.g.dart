// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'region_city_list_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RegionCityListResponse _$RegionCityListResponseFromJson(
  Map<String, dynamic> json,
) => RegionCityListResponse(
  items: (json['items'] as List<dynamic>)
      .map((e) => RegionCityModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  limit: json['limit'] as String,
  offset: json['offset'] as String,
);

Map<String, dynamic> _$RegionCityListResponseToJson(
  RegionCityListResponse instance,
) => <String, dynamic>{
  'items': instance.items.map((e) => e.toJson()).toList(),
  'limit': instance.limit,
  'offset': instance.offset,
};
