import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateCanGetPrivateToDoContext
} from '@copor/todo/domain/ToDo/PrivateToDo/validation/validator/ValidateCanGetPrivateToDo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakePermissionRepository} from '@copor/core/client/GlobalRepository/FakePermissionRepository';
import {
	KyselyGetPrivateToDoValidatorPermissionRepo
} from '@copor/todo/client/ToDo/GetToDo/repo/kysely/KyselyGetPrivateToDoValidatorPermissionRepo';

export class GetPrivateToDoValidatorPermissionRepoPicker
	extends NewRepositoryPicker<PermissionRepository<ValidateCanGetPrivateToDoContext>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => PermissionRepository<ValidateCanGetPrivateToDoContext>> {
		return {
			[DBEnv.FAKE]: FakePermissionRepository,
			[DBEnv.KYSELY]: KyselyGetPrivateToDoValidatorPermissionRepo
		};
	}
}