import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNotificationTokenDTO}
	from '@copor/core/domain/Components/NotificationToken/interactor/dto/SaveNotificationTokenDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNotificationTokenInteractorRepo} from '../fake/FakeCreateNotificationTokenInteractorRepo';
import {KyselyCreateNotificationTokenInteractorRepo} from '@copor/core/client/Components/NotificationToken/CreateNotificationToken/repo/kysely/KyselyCreateNotificationTokenInteractorRepo';

export class CreateNotificationTokenInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveNotificationTokenDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveNotificationTokenDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateNotificationTokenInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateNotificationTokenInteractorRepo
		};
	}
}
