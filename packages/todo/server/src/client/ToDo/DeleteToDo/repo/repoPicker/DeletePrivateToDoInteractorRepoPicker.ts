import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeletePrivateToDoInteractorRepo} from '../fake/FakeDeletePrivateToDoInteractorRepo';
import {
    KyselyDeletePrivateToDoInteractorRepo
} from '@copor/todo/client/ToDo/DeleteToDo/repo/kysely/KyselyDeletePrivateToDoInteractorRepo';

export class DeletePrivateToDoInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeletePrivateToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeletePrivateToDoInteractorRepo
		};
	}
}
