// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'save_calendar_entry_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SaveCalendarEntryDTO _$SaveCalendarEntryDTOFromJson(
  Map<String, dynamic> json,
) => SaveCalendarEntryDTO(
  id: json['id'] as String?,
  userId: json['userId'] as String,
  type: $enumDecode(_$CalendarCategoryEnumMap, json['type']),
  startDate: json['startDate'] as String,
  endDate: json['endDate'] as String,
  description: json['description'] as String?,
);

Map<String, dynamic> _$SaveCalendarEntryDTOToJson(
  SaveCalendarEntryDTO instance,
) => <String, dynamic>{
  'id': ?instance.id,
  'userId': instance.userId,
  'type': _$CalendarCategoryEnumMap[instance.type]!,
  'startDate': instance.startDate,
  'endDate': instance.endDate,
  'description': ?instance.description,
};

const _$CalendarCategoryEnumMap = {
  CalendarCategory.travel: 'TRAVEL',
  CalendarCategory.holidays: 'HOLIDAYS',
};
