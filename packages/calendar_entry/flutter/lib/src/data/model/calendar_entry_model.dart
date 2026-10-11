import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_calendar_entry/src/data/model/calendar_category.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'calendar_entry_model.g.dart';

/// A manually managed calendar time span (travel, holidays or unknown).
@JsonSerializable()
class CalendarEntryModel extends BaseModel {
  static const String namespaceStatic = 'CalendarEntry';

  final String id;
  final String userId;
  final CalendarCategory type;
  final String startDate;
  final String endDate;
  final String? description;
  final String? creatorName;

  const CalendarEntryModel({
    required this.id,
    required this.userId,
    required this.type,
    required this.startDate,
    required this.endDate,
    this.description,
    this.creatorName,
  });

  factory CalendarEntryModel.fromJson(JSON json) => _$CalendarEntryModelFromJson(json);

  @override
  JSON toJson() => _$CalendarEntryModelToJson(this);

  @override
  String get namespace => namespaceStatic;

  @override
  List<Object?> get props => [id, userId, type, startDate, endDate, description, creatorName];
}
