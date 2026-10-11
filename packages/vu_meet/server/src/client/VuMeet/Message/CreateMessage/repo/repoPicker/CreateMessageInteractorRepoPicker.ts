import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateMessageInteractorRepo} from '../fake/FakeCreateMessageInteractorRepo';
import {SaveMessageDTO}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';
import {KyselyCreateMessageInteractorRepo}
	from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/kysely/KyselyCreateMessageInteractorRepo';

export class CreateMessageInteractorRepoPicker
	extends NewRepositoryPicker<SaveItem<SaveMessageDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveMessageDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateMessageInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateMessageInteractorRepo
		};
	}
}
