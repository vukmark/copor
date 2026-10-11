import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/tag/config/tag_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'tag_model.g.dart';

// Rijesiti sa bekendom
bool _boolFromDynamic(dynamic json) {
  if (json is bool) return json;
  if (json is int) return json == 1;
  return false;
}

@JsonSerializable()
class TagModel extends BaseModel {
  static const String namespaceStatic = TagNamespaces.Tag;
  final String id;
  final String name;
  final int color;
  final String? description;

  @JsonKey(fromJson: _boolFromDynamic)
  final bool isPrivate;

  const TagModel({
    required this.id,
    required this.name,
    required this.color,
    this.description,
    required this.isPrivate,
  });

  factory TagModel.fromJson(JSON json) => _$TagModelFromJson(json);

  factory TagModel.empty() => const TagModel(id: '', name: '', color: 0, isPrivate: false);

  @override
  JSON toJson() => _$TagModelToJson(this);

  TagModel copyWith({String? id, String? name, String? description, bool? isPrivate, int? color}) {
    return TagModel(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      isPrivate: isPrivate ?? this.isPrivate,
      color: color ?? this.color,
    );
  }

  @override
  List<Object?> get props => [id, name, description, isPrivate, color];

  @override
  String get namespace => namespaceStatic;
}
