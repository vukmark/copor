import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'filter_model_dto.g.dart';

@JsonSerializable()
class FilterModelDTO {
  final String name;
  final List<String> values;

  const FilterModelDTO({required this.name, required this.values});

  factory FilterModelDTO.fromJson(JSON json) => _$FilterModelDTOFromJson(json);

  JSON toJson() => _$FilterModelDTOToJson(this);
}
