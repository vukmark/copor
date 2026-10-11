import 'package:json_annotation/json_annotation.dart';
import 'package:copor_core/src/utils/typedef.dart';

part 'filter_value.g.dart';

@JsonSerializable()
class FilterValue {
  final String value;
  final String translation;

  FilterValue({required this.value, required this.translation});

  factory FilterValue.fromJson(JSON json) => _$FilterValueFromJson(json);

  JSON toJson() => _$FilterValueToJson(this);
}
