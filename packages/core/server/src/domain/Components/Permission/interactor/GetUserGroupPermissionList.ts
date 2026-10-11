import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {GetUserGroupPermissionListRepo} from '../repository/GetUserGroupPermissionListRepo';

export class GetUserGroupPermissionList extends ExecuteUseCase<string, GetUserGroupPermissionListRepo, ScopedPermission[]> {
	public execute(): Promise<ScopedPermission[]> {
		return this.repository.list(this.input);
	}
}
