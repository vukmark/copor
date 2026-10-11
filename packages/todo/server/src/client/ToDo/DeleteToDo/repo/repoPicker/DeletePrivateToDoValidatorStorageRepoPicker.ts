import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeletePrivateToDoValidatorStorageRepo} from '../fake/FakeDeletePrivateToDoValidatorStorageRepo';
import {ValidateDeletePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateDeletePrivateToDoRepo';
import {IsInvalidToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/IsInvalidToDoRepo';

export class DeletePrivateToDoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeletePrivateToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeDeletePrivateToDoValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeDeletePrivateToDoValidatorStorageRepo
		};
	}
}