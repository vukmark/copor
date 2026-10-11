import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/role/config/role_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'role_type_model.g.dart';

@JsonSerializable()
class RoleTypeModel extends BaseModel {
  static const String namespaceStatic = RoleNamespaces.RoleType;

  final String name;
  final String translation;

  const RoleTypeModel({required this.name, required this.translation});

  factory RoleTypeModel.fromJson(JSON json) => _$RoleTypeModelFromJson(json);

  @override
  JSON toJson() => _$RoleTypeModelToJson(this);

  factory RoleTypeModel.empty() => RoleTypeModel(name: '', translation: '');

  RoleTypeModel copyWith({String? name, String? translation}) {
    return RoleTypeModel(name: name ?? this.name, translation: translation ?? this.translation);
  }

  @override
  List<Object?> get props => [name, translation];

  @override
  String get namespace => namespaceStatic;
}
