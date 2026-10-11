import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'create_country_dto.g.dart';

@JsonSerializable()
class CreateCountryDTO {
  final String? id;
  final String name;
  final String code;
  final PublishStatus publishStatus;

  CreateCountryDTO({this.id, required this.name, required this.code, required this.publishStatus});

  factory CreateCountryDTO.fromJson(Map<String, dynamic> json) => _$CreateCountryDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CreateCountryDTOToJson(this);
}
