import 'package:json_annotation/json_annotation.dart';

part 'create_user_dto.g.dart';

@JsonSerializable()
class CreateUserDTO {
  final String firstName;
  final String lastName;
  final String picturePath;
  final String role;
  final bool isDefaultRole;
  final bool isActive;

  CreateUserDTO({
    required this.firstName,
    required this.lastName,
    required this.picturePath,
    required this.role,
    required this.isDefaultRole,
    required this.isActive,
  });

  factory CreateUserDTO.fromJson(Map<String, dynamic> json) => _$CreateUserDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CreateUserDTOToJson(this);
}
