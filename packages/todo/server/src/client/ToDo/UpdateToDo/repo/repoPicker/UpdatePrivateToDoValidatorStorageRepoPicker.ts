import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdatePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateUpdatePrivateToDoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdatePrivateToDoValidatorStorageRepo} from '../fake/FakeUpdatePrivateToDoValidatorStorageRepo';

export class UpdatePrivateToDoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdatePrivateToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdatePrivateToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdatePrivateToDoValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeUpdatePrivateToDoValidatorStorageRepo
		};
	}
}
