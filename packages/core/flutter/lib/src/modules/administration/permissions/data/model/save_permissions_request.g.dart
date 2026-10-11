// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'save_permissions_request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Map<String, dynamic> _$SaveRolePermissionsRequestToJson(
  SaveRolePermissionsRequest instance,
) => <String, dynamic>{
  'roleId': instance.roleId,
  'permissionList': instance.permissionList.map((e) => e.toJson()).toList(),
};

Map<String, dynamic> _$SaveUserGroupPermissionsRequestToJson(
  SaveUserGroupPermissionsRequest instance,
) => <String, dynamic>{
  'userGroupId': instance.userGroupId,
  'permissionList': instance.permissionList.map((e) => e.toJson()).toList(),
};
