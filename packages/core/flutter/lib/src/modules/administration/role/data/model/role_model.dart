import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/role/config/role_name_spaces.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_type_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'role_model.g.dart';

@JsonSerializable()
class RoleModel extends BaseModel {
  static const String namespaceStatic = RoleNamespaces.Role;

  final String id;
  final String name;
  final RoleTypeModel type;

  const RoleModel({required this.id, required this.name, required this.type});

  factory RoleModel.fromJson(JSON json) => _$RoleModelFromJson(json);

  @override
  JSON toJson() => _$RoleModelToJson(this);

  factory RoleModel.empty() => RoleModel(id: '', name: '', type: RoleTypeModel.empty());

  RoleModel copyWith({String? id, String? name, RoleTypeModel? type}) {
    return RoleModel(id: id ?? this.id, name: name ?? this.name, type: type ?? this.type);
  }

  @override
  List<Object?> get props => [id, name, type];

  @override
  String get namespace => namespaceStatic;
}
