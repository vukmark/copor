import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteToDoCommentInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/fake/FakeDeleteToDoCommentInteractorRepo';
import {
	KyselyDeleteToDoCommentInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/kysely/KyselyDeleteToDoCommentInteractorRepo';

export class DeleteToDoCommentInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteToDoCommentInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteToDoCommentInteractorRepo
		};
	}
}
