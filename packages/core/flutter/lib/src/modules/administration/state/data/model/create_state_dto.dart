import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'create_state_dto.g.dart';

@JsonSerializable()
class CreateStateDTO {
  final String name;
  final String code;
  final String countryId;
  final PublishStatus? publishStatus;

  CreateStateDTO({
    required this.name,
    required this.code,
    required this.countryId,
    required this.publishStatus,
  });

  factory CreateStateDTO.fromJson(Map<String, dynamic> json) => _$CreateStateDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CreateStateDTOToJson(this);
}
