import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteToDoCommentValidatorStorageRepo}
	from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/fake/FakeDeleteToDoCommentValidatorStorageRepo';
import {ValidateDeleteToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/ValidateDeleteToDoCommentRepo';

export class DeleteToDoCommentValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteToDoCommentRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteToDoCommentRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteToDoCommentValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeDeleteToDoCommentValidatorStorageRepo
		};
	}
}
