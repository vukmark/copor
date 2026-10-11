import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForCreateNotificationToken
} from '@copor/core/domain/Components/NotificationToken/logger/LogCreateNotificationToken';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNotificationTokenLoggerRepo} from '../fake/FakeCreateNotificationTokenLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateNotificationTokenLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateNotificationToken>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateNotificationToken>> {
		return {
			[DBEnv.FAKE]: FakeCreateNotificationTokenLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
