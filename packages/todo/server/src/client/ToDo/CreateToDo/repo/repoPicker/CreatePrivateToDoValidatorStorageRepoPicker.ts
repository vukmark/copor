import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreatePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateCreatePrivateToDoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeCreatePrivateToDoValidatorStorageRepo} from '../fake/FakeCreatePrivateToDoValidatorStorageRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';

export class CreatePrivateToDoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateCreatePrivateToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreatePrivateToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeCreatePrivateToDoValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeCreatePrivateToDoValidatorStorageRepo
		};
	}
}
