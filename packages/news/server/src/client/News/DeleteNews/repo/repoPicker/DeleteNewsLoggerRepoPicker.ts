import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteNews} from '@copor/news/domain/News/logger/LogDeleteNews';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteNewsLoggerRepo} from '@copor/news/client/News/DeleteNews/repo/fake/FakeDeleteNewsLoggerRepo';
import {KyselyDeleteNewsLoggerRepo} from '@copor/news/client/News/DeleteNews/repo/kysely/KyselyDeleteNewsLoggerRepo';

export class DeleteNewsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteNews>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteNews>> {
		return {
			[DBEnv.FAKE]: FakeDeleteNewsLoggerRepo,
			[DBEnv.KYSELY]: KyselyDeleteNewsLoggerRepo
		};
	}
}