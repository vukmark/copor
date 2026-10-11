// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'column_header_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ColumnHeaderModel _$ColumnHeaderModelFromJson(Map<String, dynamic> json) =>
    ColumnHeaderModel(
      name: json['name'] as String,
      key: json['key'] as String?,
      sortKey: json['sortKey'] as String?,
      type: $enumDecodeNullable(_$ColumnTypeEnumMap, json['type']),
      info: json['info'] as String?,
      size: $enumDecodeNullable(_$DTColumnSizeEnumMap, json['size']),
      fixedWidth: (json['fixedWidth'] as num?)?.toDouble(),
      defaultSortDir: json['defaultSortDir'] as String?,
      alignment: $enumDecodeNullable(
        _$DTColumnAlignmentEnumMap,
        json['alignment'],
      ),
    );

Map<String, dynamic> _$ColumnHeaderModelToJson(ColumnHeaderModel instance) =>
    <String, dynamic>{
      'name': instance.name,
      'key': instance.key,
      'sortKey': instance.sortKey,
      'type': _$ColumnTypeEnumMap[instance.type],
      'info': instance.info,
      'size': _$DTColumnSizeEnumMap[instance.size],
      'fixedWidth': instance.fixedWidth,
      'defaultSortDir': instance.defaultSortDir,
      'alignment': _$DTColumnAlignmentEnumMap[instance.alignment],
    };

const _$ColumnTypeEnumMap = {
  ColumnType.defaultType: 'defaultType',
  ColumnType.publishStatus: 'publishStatus',
  ColumnType.boolean: 'boolean',
  ColumnType.colorType: 'colorType',
  ColumnType.isCurrentType: 'isCurrentType',
  ColumnType.copyableText: 'copyableText',
  ColumnType.date: 'date',
  ColumnType.priority: 'priority',
  ColumnType.progress: 'progress',
};

const _$DTColumnSizeEnumMap = {
  DTColumnSize.col1: 'col1',
  DTColumnSize.col2: 'col2',
  DTColumnSize.col3: 'col3',
  DTColumnSize.col4: 'col4',
  DTColumnSize.col5: 'col5',
  DTColumnSize.col6: 'col6',
  DTColumnSize.col7: 'col7',
  DTColumnSize.col8: 'col8',
  DTColumnSize.col9: 'col9',
  DTColumnSize.col10: 'col10',
  DTColumnSize.col11: 'col11',
  DTColumnSize.col12: 'col12',
  DTColumnSize.col13: 'col13',
  DTColumnSize.col14: 'col14',
  DTColumnSize.col15: 'col15',
  DTColumnSize.col16: 'col16',
  DTColumnSize.col17: 'col17',
  DTColumnSize.col18: 'col18',
  DTColumnSize.col19: 'col19',
  DTColumnSize.col20: 'col20',
  DTColumnSize.col21: 'col21',
  DTColumnSize.col22: 'col22',
  DTColumnSize.col23: 'col23',
  DTColumnSize.col24: 'col24',
};

const _$DTColumnAlignmentEnumMap = {
  DTColumnAlignment.left: 'left',
  DTColumnAlignment.right: 'right',
  DTColumnAlignment.center: 'center',
};
