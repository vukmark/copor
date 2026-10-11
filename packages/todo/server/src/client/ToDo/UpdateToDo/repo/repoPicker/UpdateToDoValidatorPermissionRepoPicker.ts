import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakePermissionRepository} from '@copor/core/client/GlobalRepository/FakePermissionRepository';
import {KyselyUpdateToDoValidatorPermissionRepo}
	from '@copor/todo/client/ToDo/UpdateToDo/repo/kysely/KyselyUpdateToDoValidatorPermissionRepo';
import {ValidateCanUpdatePrivateToDoContext} from '@copor/todo/domain/ToDo/PrivateToDo/validation/validator/ValidateCanUpdatePrivateToDo';

export class UpdateToDoValidatorPermissionRepoPicker
	extends NewRepositoryPicker<PermissionRepository<ValidateCanUpdatePrivateToDoContext>> {
	protected getRepositoryList()
	: Record<string, new (appContext: AppContext) => PermissionRepository<ValidateCanUpdatePrivateToDoContext>> {
		return {
			[DBEnv.KYSELY]: KyselyUpdateToDoValidatorPermissionRepo,
			[DBEnv.FAKE]: FakePermissionRepository
		};
	}
}