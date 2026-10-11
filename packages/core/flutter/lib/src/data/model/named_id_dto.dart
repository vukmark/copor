import 'package:json_annotation/json_annotation.dart';
import 'package:copor_core/src/utils/typedef.dart';

part 'named_id_dto.g.dart';

@JsonSerializable()
class NamedIdDTO {
  final String id;
  final String name;

  const NamedIdDTO({required this.id, required this.name});

  factory NamedIdDTO.fromJson(JSON json) => _$NamedIdDTOFromJson(json);
  JSON toJson() => _$NamedIdDTOToJson(this);

  factory NamedIdDTO.empty() => const NamedIdDTO(id: '', name: '');
}
