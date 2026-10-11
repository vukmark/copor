import {SetPermissionListToRoleDTO}
	from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {SetPermissionListToRoleRepo}
	from '@copor/core/domain/Components/Permission/repository/SetPermissionListToRoleRepo';

export class FakeSetPermissionListToRoleInteractorRepo implements SetPermissionListToRoleRepo {
	save(saveDTO: SetPermissionListToRoleDTO): Promise<void> {
		return Promise.resolve();
	}
}
