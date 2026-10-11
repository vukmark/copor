import 'package:json_annotation/json_annotation.dart';

part 'create_role_dto.g.dart';

@JsonSerializable()
class CreateRoleDTO {
  final String? id;
  final String name;
  final String type;

  CreateRoleDTO({this.id, required this.name, required this.type});

  factory CreateRoleDTO.fromJson(Map<String, dynamic> json) => _$CreateRoleDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CreateRoleDTOToJson(this);
}
