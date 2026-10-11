import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {CreateAttachmentToToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/CreateAttachmentToToDoRepo';
import {FakeCreateAttachmentForToDoInteractorRepo} from '../fake/FakeCreateAttachmentForToDoInteractorRepo';
import {
	KyselyCreateAttachmentForToDoInteractorRepo
} from '@copor/todo/client/ToDo/Attachment/CreateAttachment/repo/kysely/KyselyCreateAttachmentForToDoInteractorRepo';

export class CreateAttachmentForToDoInteractorRepoPicker extends NewRepositoryPicker<CreateAttachmentToToDoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => CreateAttachmentToToDoRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateAttachmentForToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateAttachmentForToDoInteractorRepo
		};
	}
}
