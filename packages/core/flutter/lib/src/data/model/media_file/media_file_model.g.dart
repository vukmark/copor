// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'media_file_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Map<String, dynamic> _$MediaFileModelToJson(MediaFileModel instance) =>
    <String, dynamic>{
      'stringify': instance.stringify,
      'hashCode': instance.hashCode,
      'props': instance.props,
      'id': instance.id,
      'name': instance.name,
      'mime_type': const MimeTypeConverter().toJson(instance.type),
      'size': instance.size,
      'bytes': const Uint8ListConverter().toJson(instance.bytes),
    };
