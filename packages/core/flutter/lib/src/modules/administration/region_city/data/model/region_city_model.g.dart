// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'region_city_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RegionCityModel _$RegionCityModelFromJson(Map<String, dynamic> json) =>
    RegionCityModel(
      id: json['id'] as String,
      regionId: json['regionId'] as String,
      city: json['city'] as String,
      province: json['province'] as String?,
      provinceCode: json['provinceCode'] as String?,
      community: json['community'] as String,
      communityCode: json['communityCode'] as String,
      postalCode: json['postalCode'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
    );

Map<String, dynamic> _$RegionCityModelToJson(RegionCityModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'regionId': instance.regionId,
      'city': instance.city,
      'province': instance.province,
      'provinceCode': instance.provinceCode,
      'community': instance.community,
      'communityCode': instance.communityCode,
      'postalCode': instance.postalCode,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
    };
