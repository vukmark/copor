import {CountUnreadNotificationsRepo}
	from '@copor/core/domain/Components/Notification/repository/CountUnreadNotificationsRepo';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCountUnreadNotificationsInteractorRepo} from '../fake/FakeCountUnreadNotificationsInteractorRepo';
import {
	KyselyCountUnreadNotificationsInteractorRepo
} from '@copor/core/client/Components/Notification/CountUnreadNotifications/kysely/KyselyCountUnreadNotificationsInteractorRepo';

export class CountUnreadNotificationsInteractorRepoPicker extends NewRepositoryPicker<CountUnreadNotificationsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => CountUnreadNotificationsRepo> {
		return {
			[DBEnv.FAKE]: FakeCountUnreadNotificationsInteractorRepo,
			[DBEnv.KYSELY]: KyselyCountUnreadNotificationsInteractorRepo
		};
	}
}
