// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'unsupported_file_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UnsupportedFileModel _$UnsupportedFileModelFromJson(
  Map<String, dynamic> json,
) => UnsupportedFileModel(
  id: json['id'] as String,
  name: json['name'] as String,
  type: const MimeTypeConverter().fromJson(json['mime_type'] as String),
  size: (json['size'] as num?)?.toInt(),
  bytes: const Uint8ListConverter().fromJson(json['bytes'] as List<int>),
);

Map<String, dynamic> _$UnsupportedFileModelToJson(
  UnsupportedFileModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'mime_type': const MimeTypeConverter().toJson(instance.type),
  'size': instance.size,
  'bytes': const Uint8ListConverter().toJson(instance.bytes),
};
