// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'calendar_entry_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CalendarEntryModel _$CalendarEntryModelFromJson(Map<String, dynamic> json) =>
    CalendarEntryModel(
      id: json['id'] as String,
      userId: json['userId'] as String,
      type: $enumDecode(_$CalendarCategoryEnumMap, json['type']),
      startDate: json['startDate'] as String,
      endDate: json['endDate'] as String,
      description: json['description'] as String?,
      creatorName: json['creatorName'] as String?,
    );

Map<String, dynamic> _$CalendarEntryModelToJson(CalendarEntryModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'type': _$CalendarCategoryEnumMap[instance.type]!,
      'startDate': instance.startDate,
      'endDate': instance.endDate,
      'description': instance.description,
      'creatorName': instance.creatorName,
    };

const _$CalendarCategoryEnumMap = {
  CalendarCategory.travel: 'TRAVEL',
  CalendarCategory.holidays: 'HOLIDAYS',
};
