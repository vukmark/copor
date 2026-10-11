import 'package:json_annotation/json_annotation.dart';

part 'create_todo_dto.g.dart';

@JsonSerializable()
class CreateToDoDTO {
  final String? id;
  final String title;
  final String priority;
  final String progress;
  final String type;
  final List<String>? tagList;
  final String? deadline;
  final bool isDisplayedInCalendar;
  final bool isPinned;

  CreateToDoDTO({
    this.id,
    required this.title,
    required this.priority,
    required this.progress,
    required this.type,
    this.deadline,
    this.tagList,
    required this.isDisplayedInCalendar,
    required this.isPinned,
  });

  factory CreateToDoDTO.fromJson(Map<String, dynamic> json) => _$CreateToDoDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CreateToDoDTOToJson(this);
}
