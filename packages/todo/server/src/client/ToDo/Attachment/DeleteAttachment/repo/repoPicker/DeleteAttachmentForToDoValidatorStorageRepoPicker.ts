import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateDeleteAttachmentForToDoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeDeleteAttachmentForToDoValidatorStorageRepo} from '../fake/FakeDeleteAttachmentForToDoValidatorStorageRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyDeleteAttachmentForToDoValidatorStorageRepo
} from '@copor/todo/client/ToDo/Attachment/DeleteAttachment/repo/kysely/KyselyDeleteAttachmentForToDoValidatorStorageRepo';

export class DeleteAttachmentForToDoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteAttachmentForToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteAttachmentForToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteAttachmentForToDoValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteAttachmentForToDoValidatorStorageRepo
		};
	}
}
