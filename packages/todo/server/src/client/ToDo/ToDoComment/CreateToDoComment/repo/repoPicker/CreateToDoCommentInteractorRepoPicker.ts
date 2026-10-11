import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateToDoCommentInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/fake/FakeCreateToDoCommentInteractorRepo';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';
import {
	KyselyCreateToDoCommentInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/kysely/KyselyCreateToDoCommentInteractorRepo';

export class CreateToDoCommentInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveToDoCommentDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveToDoCommentDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateToDoCommentInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateToDoCommentInteractorRepo
		};
	}
}
