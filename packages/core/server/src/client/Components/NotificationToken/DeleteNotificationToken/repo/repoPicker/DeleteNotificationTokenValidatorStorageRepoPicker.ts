import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteNotificationTokenValidatorStorageRepo
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/fake/FakeDeleteNotificationTokenValidatorStorageRepo';
import {
	ValidateDeleteNotificationTokenRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateDeleteNotificationTokenRepo';

export class DeleteNotificationTokenValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteNotificationTokenRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteNotificationTokenRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteNotificationTokenValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeDeleteNotificationTokenValidatorStorageRepo
		};
	}
}
