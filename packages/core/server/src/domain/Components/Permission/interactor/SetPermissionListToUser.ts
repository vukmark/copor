import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SetPermissionListToUserDTO} from './dto/SetPermissionListToUserDTO';
import {SetPermissionListToUserRepo} from '../repository/SetPermissionListToUserRepo';
import {normalizeScopedPermissionList} from '@copor/core/domain/Core/Permission/normalizeScopedPermissionList';

export class SetPermissionListToUser extends ExecuteUseCase<SetPermissionListToUserDTO, SetPermissionListToUserRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save({
			... this.input,
			permissionList: normalizeScopedPermissionList(this.input.permissionList)
		});
	}
}