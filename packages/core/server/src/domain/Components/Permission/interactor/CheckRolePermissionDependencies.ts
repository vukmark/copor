import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {CheckRolePermissionDependenciesDTO} from './dto/CheckRolePermissionDependenciesDTO';
import {GetRolePermissionListRepo} from '../repository/GetRolePermissionListRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {
	PermissionDependencyValidationResult,
	validatePermissionDependencyChange
} from '@copor/core/domain/Core/Permission/validatePermissionDependencyChange';

export class CheckRolePermissionDependencies
	extends ExecuteUseCase<CheckRolePermissionDependenciesDTO, GetRolePermissionListRepo, PermissionDependencyValidationResult> {
	public async execute(): Promise<PermissionDependencyValidationResult> {
		const currentPermissionList = await this.repository.list(this.input.roleId);

		return validatePermissionDependencyChange(
			toEnabledSet(currentPermissionList),
			toEnabledSet(this.input.desiredPermissionList)
		);
	}
}

function toEnabledSet(permissionList: ScopedPermission[]): Set<PermissionType> {
	return new Set(
		permissionList
			.filter((permission) => permission.effect === PermissionEffect.ALLOW)
			.map((permission) => permission.permissionType)
	);
}
