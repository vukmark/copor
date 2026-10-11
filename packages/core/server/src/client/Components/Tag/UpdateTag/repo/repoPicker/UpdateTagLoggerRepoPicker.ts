import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateTagLoggerRepo} from '../fake/FakeUpdateTagLoggerRepo';
import {LogDataForUpdateTag} from '@copor/core/domain/Components/Tag/logger/LogUpdateTag';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateTagLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateTag>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateTag>> {
		return {
			[DBEnv.FAKE]: FakeUpdateTagLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
