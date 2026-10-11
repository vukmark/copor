import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {FakeDeleteAttachmentForToDoInteractorRepo} from '../fake/FakeDeleteAttachmentForToDoInteractorRepo';
import {
	KyselyDeleteAttachmentForToDoInteractorRepo
} from '@copor/todo/client/ToDo/Attachment/DeleteAttachment/repo/kysely/KyselyDeleteAttachmentForToDoInteractorRepo';

export class DeleteAttachmentForToDoInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteAttachmentForToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteAttachmentForToDoInteractorRepo
		};
	}
}
