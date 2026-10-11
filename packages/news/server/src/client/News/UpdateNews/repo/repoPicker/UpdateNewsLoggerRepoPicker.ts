import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateNews} from '@copor/news/domain/News/logger/LogUpdateNews';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateNewsLoggerRepo} from '@copor/news/client/News/UpdateNews/repo/fake/FakeUpdateNewsLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateNewsLoggerRepoPicker extends
	NewRepositoryPicker<LogRepository<LogDataForUpdateNews>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateNews>> {
		return {
			[DBEnv.FAKE]: FakeUpdateNewsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}