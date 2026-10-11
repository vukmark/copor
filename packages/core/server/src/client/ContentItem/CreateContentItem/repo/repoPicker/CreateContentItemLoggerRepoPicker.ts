import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateContentItem} from '@copor/core/domain/ContentItem/logger/LogCreateContentItem';
import {Record} from 'openai/core';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateContentItemLoggerRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/fake/FakeCreateContentItemLoggerRepo';
import {
	KyselyCreateContentItemLoggerRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/kysely/KyselyCreateContentItemLoggerRepo';

export class CreateContentItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateContentItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForCreateContentItem>> {
		return {
			[DBEnv.FAKE]: FakeCreateContentItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyCreateContentItemLoggerRepo
		};
	}
}