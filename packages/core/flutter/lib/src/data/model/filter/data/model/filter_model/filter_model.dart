import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_utils/filter_name.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_utils/filter_value.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'filter_model.g.dart';

@JsonSerializable()
class FilterModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.Filter;

  final FilterName name;
  final FilterType type;
  final List<FilterValue>? values;

  const FilterModel({required this.name, required this.type, this.values});

  factory FilterModel.fromJson(JSON json) => _$FilterModelFromJson(json);

  @override
  JSON toJson() => _$FilterModelToJson(this);

  @override
  List<Object?> get props => [name, type, values];

  @override
  String get namespace => namespaceStatic;
}
