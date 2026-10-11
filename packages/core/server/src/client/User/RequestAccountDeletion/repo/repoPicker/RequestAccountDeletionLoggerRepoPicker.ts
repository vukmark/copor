import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForRequestAccountDeletion} from '@copor/core/domain/User/logger/LogRequestAccountDeletion';
import {FakeRequestAccountDeletionLoggerRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/fake/FakeRequestAccountDeletionLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class RequestAccountDeletionLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForRequestAccountDeletion>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForRequestAccountDeletion>> {
		return {
			[DBEnv.FAKE]: FakeRequestAccountDeletionLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
