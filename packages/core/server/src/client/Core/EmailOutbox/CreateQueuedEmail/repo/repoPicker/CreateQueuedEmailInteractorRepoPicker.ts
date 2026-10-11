import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateQueuedEmailInteractorRepo} from '../fake/FakeCreateQueuedEmailInteractorRepo';
import {SaveQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SaveQueuedEmailDTO';
import {KyselyCreateQueuedEmailInteractorRepo}
	from '@copor/core/client/Core/EmailOutbox/CreateQueuedEmail/repo/kysely/KyselyCreateQueuedEmailInteractorRepo';

export class CreateQueuedEmailInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveQueuedEmailDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveQueuedEmailDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateQueuedEmailInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateQueuedEmailInteractorRepo
		};
	}
}
