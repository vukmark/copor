// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cloud_file.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CloudFile _$CloudFileFromJson(Map<String, dynamic> json) => CloudFile(
  id: json['id'] as String?,
  name: json['name'] as String,
  size: json['size'] as String,
  description: json['description'] as String,
  extension: json['extension'] as String,
  thumbnail: json['thumbnail'] as String,
  downloadURL: json['downloadURL'] as String,
  creatorId: json['creatorId'] as String,
  creatorName: json['creatorName'] as String,
  createdAt: json['createdAt'] as String?,
);

Map<String, dynamic> _$CloudFileToJson(CloudFile instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'size': instance.size,
  'description': instance.description,
  'extension': instance.extension,
  'thumbnail': instance.thumbnail,
  'downloadURL': instance.downloadURL,
  'creatorId': instance.creatorId,
  'creatorName': instance.creatorName,
  'createdAt': instance.createdAt,
};
