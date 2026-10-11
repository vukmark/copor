import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateNews} from '@copor/news/domain/News/logger/LogCreateNews';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNewsLoggerRepo} from '@copor/news/client/News/CreateNews/repo/fake/FakeCreateNewsLoggerRepo';
import {KyselyCreateNewsLoggerRepo} from '@copor/news/client/News/CreateNews/repo/kysely/KyselyCreateNewsLoggerRepo';

export class CreateNewsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateNews>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForCreateNews>> {
		return {
			[DBEnv.FAKE]: FakeCreateNewsLoggerRepo,
			[DBEnv.KYSELY]: KyselyCreateNewsLoggerRepo
		};
	}
}
