// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'todo_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TodoModel _$TodoModelFromJson(Map<String, dynamic> json) => TodoModel(
  id: json['id'] as String,
  title: json['title'] as String,
  deadline: json['deadline'] as String?,
  progress: json['progress'] as String,
  isPinned: json['isPinned'] as bool,
  isDisplayedInCalendar: json['isDisplayedInCalendar'] as bool,
  priority: PriorityModel.fromJson(json['priority'] as Map<String, dynamic>),
  attachmentList:
      (json['attachmentList'] as List<dynamic>?)
          ?.map((e) => TodoAttachmentModel.fromJson(e as Map<String, dynamic>))
          .toList() ??
      [],
  type: json['type'] as String,
  creatorId: json['creatorId'] as String?,
  creatorName: TodoModel._readCreatorName(json, 'creatorName') as String?,
  tagList: TodoModel._tagListFromJson(json['tagList'] as List?),
);

Map<String, dynamic> _$TodoModelToJson(TodoModel instance) => <String, dynamic>{
  'id': instance.id,
  'title': instance.title,
  'deadline': instance.deadline,
  'progress': instance.progress,
  'isPinned': instance.isPinned,
  'isDisplayedInCalendar': instance.isDisplayedInCalendar,
  'priority': instance.priority,
  'attachmentList': instance.attachmentList,
  'type': instance.type,
  'creatorId': instance.creatorId,
  'creatorName': instance.creatorName,
  'tagList': instance.tagList,
};
