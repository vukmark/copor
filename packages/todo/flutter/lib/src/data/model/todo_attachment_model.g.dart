// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'todo_attachment_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TodoAttachmentModel _$TodoAttachmentModelFromJson(Map<String, dynamic> json) =>
    TodoAttachmentModel(
      id: json['id'] as String,
      name: json['name'] as String,
      size: (json['size'] as num).toInt(),
    );

Map<String, dynamic> _$TodoAttachmentModelToJson(
  TodoAttachmentModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'size': instance.size,
};
