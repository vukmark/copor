import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetNews} from '@copor/news/domain/News/logger/LogGetNews';
import {Record} from 'openai/core';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetNewsLoggerRepo} from '@copor/news/client/News/GetNews/repo/kysely/KyselyGetNewsLoggerRepo';
import {FakeGetNewsLoggerRepo} from '@copor/news/client/News/GetNews/repo/fake/FakeGetNewsLoggerRepo';

export class GetNewsLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetNews>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetNews>> {
		return {
			[DBEnv.KYSELY]: KyselyGetNewsLoggerRepo,
			[DBEnv.FAKE]: FakeGetNewsLoggerRepo
		};
	}
}