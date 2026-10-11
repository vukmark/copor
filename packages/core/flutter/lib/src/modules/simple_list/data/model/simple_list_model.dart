import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'simple_list_model.g.dart';

@JsonSerializable(explicitToJson: true)
class SimpleListModel extends BaseModel {
  static final String namespaceStatic = ModelNamespaces.SimpleList;

  final List<NamedIdModel<String>> items;
  final String? limit;
  final String? offset;

  const SimpleListModel({required this.items, this.limit, this.offset});

  factory SimpleListModel.empty() => const SimpleListModel(items: []);

  factory SimpleListModel.fromJson(JSON json) => _$SimpleListModelFromJson(json);

  @override
  JSON toJson() => _$SimpleListModelToJson(this);

  @override
  String get namespace => namespaceStatic;

  @override
  List<Object?> get props => [items, limit, offset];

  SimpleListModel copyWith({List<NamedIdModel<String>>? items, String? limit, String? offset}) {
    return SimpleListModel(
      items: items ?? this.items,
      limit: limit ?? this.limit,
      offset: offset ?? this.offset,
    );
  }
}
