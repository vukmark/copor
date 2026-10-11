import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetToDoCommentValidatorStorageRepo} from '../fake/FakeGetToDoCommentValidatorStorageRepo';
import {ValidateGetToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/validations/repository/ValidateGetToDoCommentRepo';
import {IsInvalidToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/IsInvalidToDoCommentRepo';

export class GetToDoCommentValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetToDoCommentRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> IsInvalidToDoCommentRepo> {
		return {
			[DBEnv.FAKE]: FakeGetToDoCommentValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeGetToDoCommentValidatorStorageRepo
		};
	}
}
