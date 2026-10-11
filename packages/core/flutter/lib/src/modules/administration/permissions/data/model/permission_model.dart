import 'package:copor_core/src/modules/administration/permissions/data/model/permission_type_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'permission_model.g.dart';

@JsonSerializable()
class PermissionModel {
  final String id;
  final String name;
  final PermissionTypeModel type;

  PermissionModel({required this.id, required this.name, required this.type});

  factory PermissionModel.fromJson(JSON json) => _$PermissionModelFromJson(json);

  JSON toJson() => _$PermissionModelToJson(this);

  factory PermissionModel.empty() =>
      PermissionModel(id: '', name: '', type: PermissionTypeModel.empty());

  PermissionModel copyWith({String? id, String? name, PermissionTypeModel? type}) {
    return PermissionModel(id: id ?? this.id, name: name ?? this.name, type: type ?? this.type);
  }
}
