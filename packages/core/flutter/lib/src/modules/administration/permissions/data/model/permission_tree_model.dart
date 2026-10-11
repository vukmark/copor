import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'permission_tree_model.g.dart';

@JsonSerializable()
class PermissionTreeModel extends Equatable {
  final List<PermissionTreeRoleModel> roleList;
  final List<UserGroupModel> userGroupTree;
  final String cacheId;

  const PermissionTreeModel({
    required this.roleList,
    required this.userGroupTree,
    required this.cacheId,
  });

  factory PermissionTreeModel.fromJson(JSON json) => _$PermissionTreeModelFromJson(json);

  JSON toJson() => _$PermissionTreeModelToJson(this);

  @override
  List<Object?> get props => [roleList, userGroupTree, cacheId];
}

@JsonSerializable()
class PermissionTreeRoleModel extends Equatable {
  final String id;
  final String type;
  final String name;

  const PermissionTreeRoleModel({required this.id, required this.type, required this.name});

  factory PermissionTreeRoleModel.fromJson(JSON json) => _$PermissionTreeRoleModelFromJson(json);

  JSON toJson() => _$PermissionTreeRoleModelToJson(this);

  @override
  List<Object?> get props => [id, type, name];
}
