import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    LogDataForDeleteNotificationToken
} from '@copor/core/domain/Components/NotificationToken/logger/LogDeleteNotificationToken';
import {
    FakeDeleteNotificationTokenLoggerRepo
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/fake/FakeDeleteNotificationTokenLoggerRepo';

export class DeleteNotificationTokenLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteNotificationToken>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteNotificationToken>> {
		return {
			[DBEnv.FAKE]: FakeDeleteNotificationTokenLoggerRepo,
			[DBEnv.KYSELY]: FakeDeleteNotificationTokenLoggerRepo
		};
	}
}
