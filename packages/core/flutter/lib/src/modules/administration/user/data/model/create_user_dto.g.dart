// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_user_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateUserDTO _$CreateUserDTOFromJson(Map<String, dynamic> json) =>
    CreateUserDTO(
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      picturePath: json['picturePath'] as String,
      role: json['role'] as String,
      isDefaultRole: json['isDefaultRole'] as bool,
      isActive: json['isActive'] as bool,
    );

Map<String, dynamic> _$CreateUserDTOToJson(CreateUserDTO instance) =>
    <String, dynamic>{
      'firstName': instance.firstName,
      'lastName': instance.lastName,
      'picturePath': instance.picturePath,
      'role': instance.role,
      'isDefaultRole': instance.isDefaultRole,
      'isActive': instance.isActive,
    };
