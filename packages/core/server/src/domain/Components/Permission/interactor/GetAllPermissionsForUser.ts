import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {GetAllPermissionsForUserRepo} from '@copor/core/domain/Components/Permission/repository/GetAllPermissionsForUserRepo';

export class GetAllPermissionsForUser extends ExecuteUseCase<
	string,
	GetAllPermissionsForUserRepo,
	ScopedPermission[]
> {
	public execute(): Promise<ScopedPermission[]> {
		return this.repository.list(this.input);
	}
}
