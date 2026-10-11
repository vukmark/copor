import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteContentItemLoggerRepo
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/fake/FakeDeleteContentItemLoggerRepo';
import {
	KyselyDeleteContentItemLoggerRepo
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/kysely/KyselyDeleteContentItemLoggerRepo';
import {LogDataForDeleteContentItem} from '@copor/core/domain/ContentItem/logger/LogDeleteContentItem';

export class DeleteContentItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteContentItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteContentItem>> {
		return {
			[DBEnv.FAKE]: FakeDeleteContentItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyDeleteContentItemLoggerRepo
		};
	}
}