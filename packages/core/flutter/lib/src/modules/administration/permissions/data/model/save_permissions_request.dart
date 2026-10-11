import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'save_permissions_request.g.dart';

@JsonSerializable(createFactory: false, explicitToJson: true)
class SaveRolePermissionsRequest {
  final String roleId;
  final List<RolePermissionModel> permissionList;

  const SaveRolePermissionsRequest({required this.roleId, required this.permissionList});

  JSON toJson() => _$SaveRolePermissionsRequestToJson(this);
}

@JsonSerializable(createFactory: false, explicitToJson: true)
class SaveUserGroupPermissionsRequest {
  final String userGroupId;
  final List<RolePermissionModel> permissionList;

  const SaveUserGroupPermissionsRequest({required this.userGroupId, required this.permissionList});

  JSON toJson() => _$SaveUserGroupPermissionsRequestToJson(this);
}
