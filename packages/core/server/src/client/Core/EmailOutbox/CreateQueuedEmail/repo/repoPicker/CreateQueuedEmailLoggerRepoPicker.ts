import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateQueuedEmailLoggerRepo} from '../fake/FakeCreateQueuedEmailLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForCreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/logger/LogCreateQueuedEmail';

export class CreateQueuedEmailLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateQueuedEmail>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateQueuedEmail>> {
		return {
			[DBEnv.FAKE]: FakeCreateQueuedEmailLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
