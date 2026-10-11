import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetToDoCommentInteractorRepo} from '../fake/FakeGetToDoCommentInteractorRepo';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {
	KyselyGetToDoCommentInteractorRepo
} from '@copor/todo/client/ToDo/ToDoComment/GetToDoComment/repo/kysely/KyselyGetToDoCommentInteractorRepo';

export class GetToDoCommentInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetToDoCommentDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetToDoCommentDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetToDoCommentInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetToDoCommentInteractorRepo
		};
	}
}
