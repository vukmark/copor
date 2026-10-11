import 'package:copor_core/src/modules/administration/region_city/data/model/region_city_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'region_city_list_response.g.dart';

@JsonSerializable(explicitToJson: true)
class RegionCityListResponse {
  final List<RegionCityModel> items;
  final String limit;
  final String offset;

  const RegionCityListResponse({required this.items, required this.limit, required this.offset});

  factory RegionCityListResponse.fromJson(JSON json) => _$RegionCityListResponseFromJson(json);

  JSON toJson() => _$RegionCityListResponseToJson(this);
}
