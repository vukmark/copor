import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForDeleteState} from '@copor/core/domain/Components/State/logger/LogDeleteState';
import {FakeDeleteStateLoggerRepo} from '@copor/core/client/Components/State/DeleteState/repo/fake/FakeDeleteStateLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteStateLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteState>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteState>> {
		return {
			[DBEnv.FAKE]: FakeDeleteStateLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}