import 'package:json_annotation/json_annotation.dart';

part 'log_info_model.g.dart';

enum LogFieldType {
  @JsonValue("TEXT")
  TEXT,
  @JsonValue("COPYABLE_TEXT")
  COPYABLE_TEXT,
}

@JsonSerializable(explicitToJson: true)
class LogInfoModel {
  final String title;
  final List<LogInfoField> fields;
  final String logDataTitle;
  final List<LogInfoField> logDataFields;

  const LogInfoModel({
    required this.title,
    required this.fields,
    required this.logDataTitle,
    required this.logDataFields,
  });

  factory LogInfoModel.fromJson(Map<String, dynamic> json) => _$LogInfoModelFromJson(json);

  Map<String, dynamic> toJson() => _$LogInfoModelToJson(this);
}

@JsonSerializable(explicitToJson: true)
class LogInfoField {
  final String label;
  final LogInfoValue value;
  final LogFieldType type;

  const LogInfoField({required this.label, required this.value, required this.type});

  factory LogInfoField.fromJson(Map<String, dynamic> json) => _$LogInfoFieldFromJson(json);

  Map<String, dynamic> toJson() => _$LogInfoFieldToJson(this);
}

@JsonSerializable()
class LogInfoValue {
  final String text;

  const LogInfoValue({required this.text});

  factory LogInfoValue.fromJson(Map<String, dynamic> json) => _$LogInfoValueFromJson(json);

  Map<String, dynamic> toJson() => _$LogInfoValueToJson(this);
}
