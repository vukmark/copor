import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export interface ScopedPermission {
	permissionType: PermissionType;
	scope: PermissionScope;
	effect: PermissionEffect;
	// Only populated when `effect` is INHERIT: the Allow/Deny this permission
	// actually resolves to by walking up the group's own ancestor chain.
	effectiveEffect?: PermissionEffect;
}

export interface SetPermissionListToRoleDTO {
	roleId: string;
	actorId: string;
	permissionList: ScopedPermission[];
}