import 'package:json_annotation/json_annotation.dart';

enum CellType {
  @JsonValue('text')
  text,
  @JsonValue('publishStatus')
  publishStatus,
  @JsonValue('isChecked')
  isChecked,
  @JsonValue('color')
  color,
  @JsonValue('featured')
  featured,
  @JsonValue('copyableText')
  copyableText,
  @JsonValue('date')
  date,
  @JsonValue('priority')
  priority,
  @JsonValue('progress')
  progress,
  @JsonValue('action')
  action,
  @JsonValue('hiddenText')
  hiddenText,
  @JsonValue('dateTime')
  dateTime,
  @JsonValue('groupList')
  groupList,
  @JsonValue('description')
  description,
}
