import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateGetAttachmentForToDoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeGetAttachmentForToDoValidatorStorageRepo} from '../fake/FakeGetAttachmentForToDoValidatorStorageRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetAttachmentForToDoValidatorStorageRepo
} from '@copor/todo/client/ToDo/Attachment/GetAttachment/repo/kysely/KyselyGetAttachmentForToDoValidatorStorageRepo';

export class GetAttachmentForToDoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetAttachmentForToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetAttachmentForToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeGetAttachmentForToDoValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetAttachmentForToDoValidatorStorageRepo
		};
	}
}
