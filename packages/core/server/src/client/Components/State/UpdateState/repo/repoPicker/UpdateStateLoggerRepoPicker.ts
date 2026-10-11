import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateStateLoggerRepo} from '@copor/core/client/Components/State/UpdateState/repo/fake/FakeUpdateStateLoggerRepo';
import {LogDataForUpdateState} from '@copor/core/domain/Components/State/logger/LogUpdateState';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateStateLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateState>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateState>> {
		return {
			[DBEnv.FAKE]: FakeUpdateStateLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
