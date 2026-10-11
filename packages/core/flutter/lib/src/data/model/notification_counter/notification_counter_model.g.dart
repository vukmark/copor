// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'notification_counter_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NotificationCounterModel _$NotificationCounterModelFromJson(
  Map<String, dynamic> json,
) => NotificationCounterModel(
  todo: (json['todo'] as num?)?.toInt() ?? 0,
  vuMeet: (json['vuMeet'] as num?)?.toInt() ?? 0,
);

Map<String, dynamic> _$NotificationCounterModelToJson(
  NotificationCounterModel instance,
) => <String, dynamic>{'todo': instance.todo, 'vuMeet': instance.vuMeet};
