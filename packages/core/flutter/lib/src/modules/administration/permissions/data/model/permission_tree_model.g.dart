// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'permission_tree_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PermissionTreeModel _$PermissionTreeModelFromJson(Map<String, dynamic> json) =>
    PermissionTreeModel(
      roleList: (json['roleList'] as List<dynamic>)
          .map(
            (e) => PermissionTreeRoleModel.fromJson(e as Map<String, dynamic>),
          )
          .toList(),
      userGroupTree: (json['userGroupTree'] as List<dynamic>)
          .map((e) => UserGroupModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      cacheId: json['cacheId'] as String,
    );

Map<String, dynamic> _$PermissionTreeModelToJson(
  PermissionTreeModel instance,
) => <String, dynamic>{
  'roleList': instance.roleList,
  'userGroupTree': instance.userGroupTree,
  'cacheId': instance.cacheId,
};

PermissionTreeRoleModel _$PermissionTreeRoleModelFromJson(
  Map<String, dynamic> json,
) => PermissionTreeRoleModel(
  id: json['id'] as String,
  type: json['type'] as String,
  name: json['name'] as String,
);

Map<String, dynamic> _$PermissionTreeRoleModelToJson(
  PermissionTreeRoleModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'type': instance.type,
  'name': instance.name,
};
