import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {
	SetPermissionListToUserGroupDTO
} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserGroupDTO';
import {
	SetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToUserGroupRepo';
import {normalizeScopedPermissionList} from '@copor/core/domain/Core/Permission/normalizeScopedPermissionList';

export class SetPermissionListToUserGroup extends ExecuteUseCase<SetPermissionListToUserGroupDTO, SetPermissionListToUserGroupRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save({
			... this.input,
			permissionList: normalizeScopedPermissionList(this.input.permissionList)
		});
	}
}