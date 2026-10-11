import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SavePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/SavePrivateToDoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdatePrivateToDoInteractorRepo} from '../fake/FakeUpdatePrivateToDoInteractorRepo';
import {
    KyselyUpdatePrivateToDoInteractorRepo
} from '@copor/todo/client/ToDo/UpdateToDo/repo/kysely/KyselyUpdatePrivateToDoInteractorRepo';

export class UpdatePrivateToDoInteractorRepoPicker extends NewRepositoryPicker<SavePrivateToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SavePrivateToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdatePrivateToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdatePrivateToDoInteractorRepo
		};
	}
}
