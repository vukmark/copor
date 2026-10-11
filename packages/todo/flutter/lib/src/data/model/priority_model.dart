import 'package:json_annotation/json_annotation.dart';
import 'package:copor_core/src/utils/typedef.dart';

part 'priority_model.g.dart';

@JsonSerializable()
class PriorityModel {
  final String id;
  final int color;

  const PriorityModel({required this.id, required this.color});

  factory PriorityModel.fromJson(JSON json) => _$PriorityModelFromJson(json);
  JSON toJson() => _$PriorityModelToJson(this);

  factory PriorityModel.empty() => const PriorityModel(id: 'NORMAL', color: 1);
}
