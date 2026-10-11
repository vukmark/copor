import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetPrivateToDoInteractorRepo} from '../fake/FakeGetPrivateToDoInteractorRepo';
import {GetPrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/GetPrivateToDoDTO';
import {
    KyselyGetPrivateToDoInteractorRepo
} from '@copor/todo/client/ToDo/GetToDo/repo/kysely/KyselyGetPrivateToDoInteractorRepo';

export class GetPrivateToDoInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetPrivateToDoDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetPrivateToDoDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetPrivateToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetPrivateToDoInteractorRepo
		};
	}
}
