import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SetPermissionListToRoleDTO} from './dto/SetPermissionListToRoleDTO';
import {SetPermissionListToRoleRepo} from '../repository/SetPermissionListToRoleRepo';
import {normalizeScopedPermissionList} from '@copor/core/domain/Core/Permission/normalizeScopedPermissionList';

export class SetPermissionListToRole extends ExecuteUseCase<SetPermissionListToRoleDTO, SetPermissionListToRoleRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save({
			... this.input,
			permissionList: normalizeScopedPermissionList(this.input.permissionList)
		});
	}
}