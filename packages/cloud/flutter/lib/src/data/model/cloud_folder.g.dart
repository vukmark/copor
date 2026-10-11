// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cloud_folder.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CloudFolder _$CloudFolderFromJson(Map<String, dynamic> json) => CloudFolder(
  name: json['name'] as String,
  uploadEndpoint: json['uploadEndpoint'] as String,
  subfolders:
      (json['subfolders'] as List<dynamic>?)
          ?.map((e) => CloudFolder.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  files:
      (json['files'] as List<dynamic>?)
          ?.map((e) => CloudFile.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
);

Map<String, dynamic> _$CloudFolderToJson(CloudFolder instance) =>
    <String, dynamic>{
      'name': instance.name,
      'uploadEndpoint': instance.uploadEndpoint,
      'subfolders': instance.subfolders,
      'files': instance.files,
    };
