import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreatePrivateToDoInteractorRepo} from '../fake/FakeCreatePrivateToDoInteractorRepo';
import {
    KyselyCreatePrivateToDoInteractorRepo
} from '@copor/todo/client/ToDo/CreateToDo/repo/kysely/KyselyCreatePrivateToDoInteractorRepo';

export class CreatePrivateToDoInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SavePrivateToDoDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SavePrivateToDoDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreatePrivateToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreatePrivateToDoInteractorRepo
		};
	}
}
