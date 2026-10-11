// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'log_info_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LogInfoModel _$LogInfoModelFromJson(Map<String, dynamic> json) => LogInfoModel(
  title: json['title'] as String,
  fields: (json['fields'] as List<dynamic>)
      .map((e) => LogInfoField.fromJson(e as Map<String, dynamic>))
      .toList(),
  logDataTitle: json['logDataTitle'] as String,
  logDataFields: (json['logDataFields'] as List<dynamic>)
      .map((e) => LogInfoField.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$LogInfoModelToJson(LogInfoModel instance) =>
    <String, dynamic>{
      'title': instance.title,
      'fields': instance.fields.map((e) => e.toJson()).toList(),
      'logDataTitle': instance.logDataTitle,
      'logDataFields': instance.logDataFields.map((e) => e.toJson()).toList(),
    };

LogInfoField _$LogInfoFieldFromJson(Map<String, dynamic> json) => LogInfoField(
  label: json['label'] as String,
  value: LogInfoValue.fromJson(json['value'] as Map<String, dynamic>),
  type: $enumDecode(_$LogFieldTypeEnumMap, json['type']),
);

Map<String, dynamic> _$LogInfoFieldToJson(LogInfoField instance) =>
    <String, dynamic>{
      'label': instance.label,
      'value': instance.value.toJson(),
      'type': _$LogFieldTypeEnumMap[instance.type]!,
    };

const _$LogFieldTypeEnumMap = {
  LogFieldType.TEXT: 'TEXT',
  LogFieldType.COPYABLE_TEXT: 'COPYABLE_TEXT',
};

LogInfoValue _$LogInfoValueFromJson(Map<String, dynamic> json) =>
    LogInfoValue(text: json['text'] as String);

Map<String, dynamic> _$LogInfoValueToJson(LogInfoValue instance) =>
    <String, dynamic>{'text': instance.text};
