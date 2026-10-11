import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAttachmentForToDoInteractorRepo} from '../fake/FakeGetAttachmentForToDoInteractorRepo';
import {GetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/GetAttachmentForToDoDTO';
import {
	KyselyGetAttachmentForToDoInteractorRepo
} from '@copor/todo/client/ToDo/Attachment/GetAttachment/repo/kysely/KyselyGetAttachmentForToDoInteractorRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class GetAttachmentForToDoInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetAttachmentForToDoDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetAttachmentForToDoDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetAttachmentForToDoInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAttachmentForToDoInteractorRepo
		};
	}
}
