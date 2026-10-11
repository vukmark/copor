import 'package:json_annotation/json_annotation.dart';
import 'package:copor_core/src/utils/typedef.dart';

part 'filter_name.g.dart';

@JsonSerializable()
class FilterName {
  final String value;
  final String translation;

  FilterName({required this.value, required this.translation});

  factory FilterName.fromJson(JSON json) => _$FilterNameFromJson(json);

  JSON toJson() => _$FilterNameToJson(this);
}
