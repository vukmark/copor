import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForCancelAccountDeletion} from '@copor/core/domain/User/logger/LogCancelAccountDeletion';
import {FakeCancelAccountDeletionLoggerRepo}
	from '@copor/core/client/User/CancelAccountDeletion/repo/fake/FakeCancelAccountDeletionLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CancelAccountDeletionLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCancelAccountDeletion>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCancelAccountDeletion>> {
		return {
			[DBEnv.FAKE]: FakeCancelAccountDeletionLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
