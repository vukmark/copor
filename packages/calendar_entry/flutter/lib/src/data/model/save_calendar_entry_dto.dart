import 'package:copor_calendar_entry/src/data/model/calendar_category.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'save_calendar_entry_dto.g.dart';

/// Request body for creating and updating a calendar entry. [id] is absent on create.
@JsonSerializable(includeIfNull: false)
class SaveCalendarEntryDTO {
  final String? id;
  final String userId;
  final CalendarCategory type;
  final String startDate;
  final String endDate;
  final String? description;

  const SaveCalendarEntryDTO({
    this.id,
    required this.userId,
    required this.type,
    required this.startDate,
    required this.endDate,
    this.description,
  });

  factory SaveCalendarEntryDTO.fromJson(JSON json) => _$SaveCalendarEntryDTOFromJson(json);

  JSON toJson() => _$SaveCalendarEntryDTOToJson(this);
}
