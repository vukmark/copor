// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'log_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LogModel _$LogModelFromJson(Map<String, dynamic> json) => LogModel(
  id: json['id'] as String,
  logData: json['logData'] as Map<String, dynamic>,
  actorId: json['actorId'] as String,
  logType: json['logType'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  actorUserName: json['actorUserName'] as String,
);

Map<String, dynamic> _$LogModelToJson(LogModel instance) => <String, dynamic>{
  'id': instance.id,
  'logData': instance.logData,
  'actorId': instance.actorId,
  'logType': instance.logType,
  'createdAt': instance.createdAt.toIso8601String(),
  'actorUserName': instance.actorUserName,
};
