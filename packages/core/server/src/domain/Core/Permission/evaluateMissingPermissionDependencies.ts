import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {getTransitiveDependencies} from '@copor/core/domain/Core/Permission/PermissionDependencyGraph';

export interface PermissionDependencyWarning {
	permissionType: PermissionType;
	missingDependencies: PermissionType[];
}

export function evaluateMissingPermissionDependencies(
	permissionList: ScopedPermission[]
): PermissionDependencyWarning[] {
	const allowedPermissionTypes = new Set(
		permissionList
			.filter((permission) => permission.effect === PermissionEffect.ALLOW)
			.map((permission) => permission.permissionType)
	);

	const warnings: PermissionDependencyWarning[] = [];

	for (const permissionType of allowedPermissionTypes) {
		const missingDependencies = getTransitiveDependencies(permissionType)
			.filter((dependency) => !allowedPermissionTypes.has(dependency));

		if (missingDependencies.length > 0)
			warnings.push({permissionType, missingDependencies});
	}

	return warnings;
}
