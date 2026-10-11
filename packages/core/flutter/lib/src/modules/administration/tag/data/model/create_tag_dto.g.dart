// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_tag_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateTagDTO _$CreateTagDTOFromJson(Map<String, dynamic> json) => CreateTagDTO(
  id: json['id'] as String?,
  name: json['name'] as String,
  color: (json['color'] as num).toInt(),
  isPrivate: json['isPrivate'] as bool,
  description: json['description'] as String?,
);

Map<String, dynamic> _$CreateTagDTOToJson(CreateTagDTO instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'isPrivate': instance.isPrivate,
      'color': instance.color,
    };
