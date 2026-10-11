import 'package:json_annotation/json_annotation.dart';

part 'create_tag_dto.g.dart';

@JsonSerializable()
class CreateTagDTO {
  final String? id;
  final String name;
  final String? description;
  final bool isPrivate;
  final int color;

  CreateTagDTO({
    this.id,
    required this.name,
    required this.color,
    required this.isPrivate,
    this.description,
  });

  factory CreateTagDTO.fromJson(Map<String, dynamic> json) => _$CreateTagDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CreateTagDTOToJson(this);
}
