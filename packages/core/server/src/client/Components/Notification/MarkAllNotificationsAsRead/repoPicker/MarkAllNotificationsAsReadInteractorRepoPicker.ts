import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeMarkAllNotificationsAsReadInteractorRepo} from '../fake/FakeMarkAllNotificationsAsReadInteractorRepo';
import {MarkAllNotificationsAsReadRepo}
	from '@copor/core/domain/Components/Notification/repository/MarkAllNotificationsAsReadRepo';

export class MarkAllNotificationsAsReadInteractorRepoPicker
	extends NewRepositoryPicker<MarkAllNotificationsAsReadRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => MarkAllNotificationsAsReadRepo> {
		return {
			[DBEnv.FAKE]: FakeMarkAllNotificationsAsReadInteractorRepo,
			[DBEnv.KYSELY]: FakeMarkAllNotificationsAsReadInteractorRepo
		};
	}
}
