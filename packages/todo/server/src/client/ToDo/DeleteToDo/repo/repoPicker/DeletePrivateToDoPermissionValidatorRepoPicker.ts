import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {FakePermissionValidatorRepo} from '@copor/core/client/Core/PermissionValidatorRepo/FakePermissionValidatorRepo';
import {ValidateCanDeletePrivateToDoContext} from '@copor/todo/domain/ToDo/PrivateToDo/validation/validator/ValidateCanDeletePrivateToDo';
import {KyselyDeletePrivateToDoValidatorPermissionRepo}
	from '@copor/todo/client/ToDo/DeleteToDo/repo/kysely/KyselyDeletePrivateToDoValidatorPermissionRepo';

export class DeletePrivateToDoPermissionValidatorRepoPicker
	extends NewRepositoryPicker<PermissionRepository<ValidateCanDeletePrivateToDoContext>> {
	protected getRepositoryList()
	: Record<string, new (appContext: AppContext) => PermissionRepository<ValidateCanDeletePrivateToDoContext>> {
		return {
			[DBEnv.FAKE]: FakePermissionValidatorRepo,
			[DBEnv.KYSELY]: KyselyDeletePrivateToDoValidatorPermissionRepo
		};
	}
}