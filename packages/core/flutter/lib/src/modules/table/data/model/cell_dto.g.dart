// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cell_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CellDTO _$CellDTOFromJson(Map<String, dynamic> json) => CellDTO(
  type: $enumDecode(_$CellTypeEnumMap, json['type']),
  content: CellContent.fromJson(json['content'] as Map<String, dynamic>),
);

Map<String, dynamic> _$CellDTOToJson(CellDTO instance) => <String, dynamic>{
  'type': _$CellTypeEnumMap[instance.type]!,
  'content': instance.content,
};

const _$CellTypeEnumMap = {
  CellType.text: 'text',
  CellType.publishStatus: 'publishStatus',
  CellType.isChecked: 'isChecked',
  CellType.color: 'color',
  CellType.featured: 'featured',
  CellType.copyableText: 'copyableText',
  CellType.date: 'date',
  CellType.priority: 'priority',
  CellType.progress: 'progress',
  CellType.action: 'action',
  CellType.hiddenText: 'hiddenText',
  CellType.dateTime: 'dateTime',
  CellType.groupList: 'groupList',
  CellType.description: 'description',
};
