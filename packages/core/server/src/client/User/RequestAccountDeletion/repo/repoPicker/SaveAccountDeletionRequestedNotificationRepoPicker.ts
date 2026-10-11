import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveNotificationRepo} from '@copor/core/domain/Components/Notification/repository/SaveNotificationRepo';
import {SaveNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/SaveNotificationDTO';
import {
	AccountDeletionRequestedNotificationTranslationData
} from '@copor/core/domain/Components/Notification/interactor/dto/AccountDeletionRequestedNotificationTranslationData';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSaveNotificationRepo} from '@copor/core/client/Components/Notification/repo/fake/FakeSaveNotificationRepo';

export class SaveAccountDeletionRequestedNotificationRepoPicker
	extends NewRepositoryPicker<SaveNotificationRepo<SaveNotificationDTO<AccountDeletionRequestedNotificationTranslationData>>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	SaveNotificationRepo<SaveNotificationDTO<AccountDeletionRequestedNotificationTranslationData>>> {
		return {
			[DBEnv.FAKE]:
                FakeSaveNotificationRepo<SaveNotificationDTO<AccountDeletionRequestedNotificationTranslationData>>,
			[DBEnv.KYSELY]:
                FakeSaveNotificationRepo<SaveNotificationDTO<AccountDeletionRequestedNotificationTranslationData>>
		};
	}
}
