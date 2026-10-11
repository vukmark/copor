import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetNotificationListInteractorRepo} from '../fake/FakeGetNotificationListInteractorRepo';
import {GetNotificationListRepo} from '@copor/core/domain/Components/Notification/repository/GetNotificationListRepo';

export class GetNotificationListInteractorRepoPicker extends NewRepositoryPicker<GetNotificationListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetNotificationListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetNotificationListInteractorRepo,
			[DBEnv.KYSELY]: FakeGetNotificationListInteractorRepo
		};
	}
}
