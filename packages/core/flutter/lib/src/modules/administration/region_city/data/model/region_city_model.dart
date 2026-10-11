import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'region_city_model.g.dart';

@JsonSerializable()
class RegionCityModel extends BaseModel {
  static const String namespaceStatic = 'region-city';

  final String id;
  final String regionId;
  final String city;
  final String? province;
  final String? provinceCode;
  final String community;
  final String communityCode;
  final String postalCode;
  final double latitude;
  final double longitude;

  const RegionCityModel({
    required this.id,
    required this.regionId,
    required this.city,
    this.province,
    this.provinceCode,
    required this.community,
    required this.communityCode,
    required this.postalCode,
    required this.latitude,
    required this.longitude,
  });

  factory RegionCityModel.fromJson(JSON json) => _$RegionCityModelFromJson(json);

  @override
  JSON toJson() => _$RegionCityModelToJson(this);

  factory RegionCityModel.empty() => const RegionCityModel(
    id: '',
    regionId: '',
    city: '',
    province: '',
    provinceCode: '',
    community: '',
    communityCode: '',
    postalCode: '',
    latitude: 0,
    longitude: 0,
  );

  @override
  List<Object?> get props => [
    id,
    regionId,
    city,
    province,
    provinceCode,
    community,
    communityCode,
    postalCode,
    latitude,
    longitude,
  ];

  @override
  String get namespace => namespaceStatic;
}
