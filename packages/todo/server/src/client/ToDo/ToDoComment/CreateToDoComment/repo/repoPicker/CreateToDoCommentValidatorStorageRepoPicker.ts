import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateToDoCommentValidatorStorageRepo}
	from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/fake/FakeCreateToDoCommentValidatorStorageRepo';
import {ValidateCreateToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/ValidateCreateToDoCommentRepo';

export class CreateToDoCommentValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateCreateToDoCommentRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateToDoCommentRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateToDoCommentValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeCreateToDoCommentValidatorStorageRepo
		};
	}
}
