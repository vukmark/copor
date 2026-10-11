import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteNotificationTokenInteractorRepo
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/fake/FakeDeleteNotificationTokenInteractorRepo';
import {
	KyselyDeleteNotificationTokenInteractorRepo
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/kysely/KyselyDeleteNotificationTokenInteractorRepo';

export class DeleteNotificationTokenInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteNotificationTokenInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteNotificationTokenInteractorRepo
		};
	}
}
