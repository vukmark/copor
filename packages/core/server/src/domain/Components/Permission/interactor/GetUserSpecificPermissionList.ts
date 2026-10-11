import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUserSpecificPermissionListRepo} from '../repository/GetUserSpecificPermissionListRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class GetUserSpecificPermissionList extends ExecuteUseCase<string, GetUserSpecificPermissionListRepo, ScopedPermission[]> {
	public execute(): Promise<ScopedPermission[]> {
		return this.repository.list(this.input);
	}
}
