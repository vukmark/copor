import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetAllCommentsForToDoRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetAllCommentsForToDoRepo';
import {
    FakeGetAllCommentsForToDoInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/GetAllCommentsForToDo/repo/fake/FakeGetAllCommentsForToDoInteractorRepo';
import {
    KyselyGetAllCommentsForToDoInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/GetAllCommentsForToDo/repo/kysely/KyselyGetAllCommentsForToDoInteractorRepo';

export class GetAllCommentsForToDoInteractorRepoPicker extends NewRepositoryPicker<GetAllCommentsForToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetAllCommentsForToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeGetAllCommentsForToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAllCommentsForToDoInteractorRepo
		};
	}
}
