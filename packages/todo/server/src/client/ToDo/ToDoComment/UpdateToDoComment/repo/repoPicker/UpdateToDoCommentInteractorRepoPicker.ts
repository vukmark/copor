import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateToDoCommentInteractorRepo} from '../fake/FakeUpdateToDoCommentInteractorRepo';
import {SaveToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/SaveToDoCommentRepo';
import {
	KyselyUpdateToDoCommentInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/UpdateToDoComment/repo/kysely/KyselyUpdateToDoCommentInteractorRepo';

export class UpdateToDoCommentInteractorRepoPicker extends NewRepositoryPicker<SaveToDoCommentRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveToDoCommentRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateToDoCommentInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateToDoCommentInteractorRepo
		};
	}
}
