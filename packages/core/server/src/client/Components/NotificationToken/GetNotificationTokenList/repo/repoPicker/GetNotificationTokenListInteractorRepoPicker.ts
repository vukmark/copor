import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeGetNotificationTokenListInteractorRepo} from '../fake/FakeGetNotificationTokenListInteractorRepo';
import {KyselyGetNotificationTokenListInteractorRepo} from '@copor/core/client/Components/NotificationToken/GetNotificationTokenList/repo/kysely/KyselyGetNotificationTokenListInteractorRepo';
import {
	GetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/GetNotificationTokenListRepo';

export class GetNotificationTokenListInteractorRepoPicker extends NewRepositoryPicker<GetNotificationTokenListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetNotificationTokenListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetNotificationTokenListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetNotificationTokenListInteractorRepo
		};
	}
}
