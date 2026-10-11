import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetContentItem} from '@copor/core/domain/ContentItem/logger/LogGetContentItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetContentItemLoggerRepo} from '@copor/core/client/ContentItem/GetContentItem/kysely/KyselyGetContentItemLoggerRepo';
import {FakeGetContentItemLoggerRepo} from '@copor/core/client/ContentItem/GetContentItem/fake/FakeGetContentItemLoggerRepo';

export class GetContentItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetContentItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetContentItem>> {
		return {
			[DBEnv.KYSELY]: KyselyGetContentItemLoggerRepo,
			[DBEnv.FAKE]: FakeGetContentItemLoggerRepo
		};
	}
}