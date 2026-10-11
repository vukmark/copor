import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateState} from '@copor/core/domain/Components/State/logger/LogCreateState';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateStateLoggerRepo} from '@copor/core/client/Components/State/CreateState/repo/fake/FakeCreateStateLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateStateLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateState>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateState>> {
		return {
			[DBEnv.FAKE]: FakeCreateStateLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
