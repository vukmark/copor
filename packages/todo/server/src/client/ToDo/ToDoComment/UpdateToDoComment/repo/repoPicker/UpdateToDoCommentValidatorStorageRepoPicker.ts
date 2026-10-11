import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateToDoCommentValidatorStorageRepo} from '../fake/FakeUpdateToDoCommentValidatorStorageRepo';
import {ValidateUpdateToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/validations/repository/ValidateUpdateToDoComment';

export class UpdateToDoCommentValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateUpdateToDoCommentRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateUpdateToDoCommentRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateToDoCommentValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeUpdateToDoCommentValidatorStorageRepo
		};
	}
}
