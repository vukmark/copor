import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

export interface RolePermission {
	effect: PermissionEffect;
	permissionType: PermissionType;
	roleId: string;
	scope: PermissionScope;
}
