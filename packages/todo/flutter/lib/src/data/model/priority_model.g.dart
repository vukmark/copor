// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'priority_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PriorityModel _$PriorityModelFromJson(Map<String, dynamic> json) =>
    PriorityModel(
      id: json['id'] as String,
      color: (json['color'] as num).toInt(),
    );

Map<String, dynamic> _$PriorityModelToJson(PriorityModel instance) =>
    <String, dynamic>{'id': instance.id, 'color': instance.color};
