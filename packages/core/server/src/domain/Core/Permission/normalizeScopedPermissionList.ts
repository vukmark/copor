import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {getPermissionDefinitions} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export function normalizeScopedPermissionList(permissionList: ScopedPermission[]): ScopedPermission[] {
	const requiresScopeByPermissionType = new Map<PermissionType, boolean>(
		getPermissionDefinitions().map((definition) => [definition.key, definition.requiresScope === true])
	);
	const normalized = permissionList.map((permission) => {
		if (requiresScopeByPermissionType.get(permission.permissionType))
			return permission;
		return {
			... permission,
			scope: PermissionScope.ALL
		};
	});

	return dedupeByPermissionTypeAndScope(normalized);
}


function dedupeByPermissionTypeAndScope(permissionList: ScopedPermission[]): ScopedPermission[] {
	const groupedByKey = new Map<string, ScopedPermission[]>();

	for (const permission of permissionList) {
		const key = `${permission.permissionType}-${permission.scope}`;
		const group = groupedByKey.get(key) ?? [];

		group.push(permission);
		groupedByKey.set(key, group);
	}

	return [... groupedByKey.values()].map((group) => resolveConflictingPermissions(group));
}

function resolveConflictingPermissions(permissionList: ScopedPermission[]): ScopedPermission {
	if (permissionList.length === 1)
		return permissionList[0];

	const allowPermission = permissionList.find((permission) => permission.effect === PermissionEffect.ALLOW);

	if (allowPermission)
		return allowPermission;

	return permissionList.find((permission) => permission.effect === PermissionEffect.DENY) ?? permissionList[permissionList.length - 1];
}
