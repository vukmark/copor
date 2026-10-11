// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cell_content.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CellContent _$CellContentFromJson(Map<String, dynamic> json) => CellContent(
  text: json['text'] as String?,
  color: (json['color'] as num?)?.toInt(),
  publishStatus: $enumDecodeNullable(
    _$PublishStatusEnumMap,
    json['publishStatus'],
  ),
  actionList: (json['actionList'] as List<dynamic>?)
      ?.map((e) => CoporActionDTOModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  copyText: json['copyText'] as String?,
  isFeatured: json['isFeatured'] as bool?,
  isChecked: json['isChecked'] as bool?,
  date: json['date'] as String?,
  priority: $enumDecodeNullable(_$PriorityEnumMap, json['priority']),
  progress: $enumDecodeNullable(_$ProgressEnumMap, json['progress']),
  hiddenText: json['hiddenText'] == null
      ? null
      : HiddenTextContent.fromJson(json['hiddenText'] as Map<String, dynamic>),
  groupList: json['groupList'] == null
      ? null
      : GroupListContent.fromJson(json['groupList'] as Map<String, dynamic>),
);

Map<String, dynamic> _$CellContentToJson(CellContent instance) =>
    <String, dynamic>{
      'text': instance.text,
      'color': instance.color,
      'publishStatus': _$PublishStatusEnumMap[instance.publishStatus],
      'actionList': instance.actionList,
      'copyText': instance.copyText,
      'isFeatured': instance.isFeatured,
      'isChecked': instance.isChecked,
      'date': instance.date,
      'priority': _$PriorityEnumMap[instance.priority],
      'progress': _$ProgressEnumMap[instance.progress],
      'hiddenText': instance.hiddenText,
      'groupList': instance.groupList,
    };

const _$PublishStatusEnumMap = {
  PublishStatus.published: 'PUBLISHED',
  PublishStatus.unpublished: 'UNPUBLISHED',
  PublishStatus.draft: 'DRAFT',
};

const _$PriorityEnumMap = {
  Priority.normal: 0,
  Priority.high: 2,
  Priority.urgent: 3,
};

const _$ProgressEnumMap = {
  Progress.toDo: 0,
  Progress.started: 1,
  Progress.halfWay: 2,
  Progress.almostDone: 3,
  Progress.finished: 4,
};

GroupListContent _$GroupListContentFromJson(Map<String, dynamic> json) =>
    GroupListContent(
      userGroupList:
          (json['userGroupList'] as List<dynamic>?)
              ?.map(
                (e) => UserGroupNameModel.fromJson(e as Map<String, dynamic>),
              )
              .toList() ??
          const [],
    );

Map<String, dynamic> _$GroupListContentToJson(GroupListContent instance) =>
    <String, dynamic>{'userGroupList': instance.userGroupList};

UserGroupNameModel _$UserGroupNameModelFromJson(Map<String, dynamic> json) =>
    UserGroupNameModel(name: json['name'] as String);

Map<String, dynamic> _$UserGroupNameModelToJson(UserGroupNameModel instance) =>
    <String, dynamic>{'name': instance.name};

HiddenTextContent _$HiddenTextContentFromJson(Map<String, dynamic> json) =>
    HiddenTextContent(
      key: json['key'] as String,
      value: json['value'] as String,
    );

Map<String, dynamic> _$HiddenTextContentToJson(HiddenTextContent instance) =>
    <String, dynamic>{'key': instance.key, 'value': instance.value};
