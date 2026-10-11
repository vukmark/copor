import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';

import {GetRolePermissionListRepo} from '../repository/GetRolePermissionListRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class GetRolePermissionList extends ExecuteUseCase<string, GetRolePermissionListRepo, ScopedPermission[]> {
	public execute(): Promise<ScopedPermission[]> {
		return this.repository.list(this.input);
	}
}
