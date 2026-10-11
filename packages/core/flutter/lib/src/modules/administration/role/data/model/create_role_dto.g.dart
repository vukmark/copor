// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_role_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateRoleDTO _$CreateRoleDTOFromJson(Map<String, dynamic> json) =>
    CreateRoleDTO(
      id: json['id'] as String?,
      name: json['name'] as String,
      type: json['type'] as String,
    );

Map<String, dynamic> _$CreateRoleDTOToJson(CreateRoleDTO instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'type': instance.type,
    };
