import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreateAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateCreateAttachmentForToDoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeCreateAttachmentForToDoValidatorStorageRepo} from '../fake/FakeCreateAttachmentForToDoValidatorStorageRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyCreateAttachmentForToDoValidatorStorageRepo
} from '@copor/todo/client/ToDo/Attachment/CreateAttachment/repo/kysely/KyselyCreateAttachmentForToDoValidatorStorageRepo';

export class CreateAttachmentForToDoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateCreateAttachmentForToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateAttachmentForToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateAttachmentForToDoValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateAttachmentForToDoValidatorStorageRepo
		};
	}
}
