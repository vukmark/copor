// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_todo_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateToDoDTO _$CreateToDoDTOFromJson(Map<String, dynamic> json) =>
    CreateToDoDTO(
      id: json['id'] as String?,
      title: json['title'] as String,
      priority: json['priority'] as String,
      progress: json['progress'] as String,
      type: json['type'] as String,
      deadline: json['deadline'] as String?,
      tagList: (json['tagList'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      isDisplayedInCalendar: json['isDisplayedInCalendar'] as bool,
      isPinned: json['isPinned'] as bool,
    );

Map<String, dynamic> _$CreateToDoDTOToJson(CreateToDoDTO instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'priority': instance.priority,
      'progress': instance.progress,
      'type': instance.type,
      'tagList': instance.tagList,
      'deadline': instance.deadline,
      'isDisplayedInCalendar': instance.isDisplayedInCalendar,
      'isPinned': instance.isPinned,
    };
