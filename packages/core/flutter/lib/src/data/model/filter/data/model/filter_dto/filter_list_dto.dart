import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'filter_list_dto.g.dart';

@JsonSerializable()
class FilterListDTO {
  final List<FilterModelDTO> filterList;
  final String limit;
  final String offset;

  const FilterListDTO({required this.filterList, required this.limit, required this.offset});

  factory FilterListDTO.empty() => const FilterListDTO(filterList: [], offset: "", limit: "");

  factory FilterListDTO.fromJson(JSON json) => _$FilterListDTOFromJson(json);

  JSON toJson() => _$FilterListDTOToJson(this);
}
