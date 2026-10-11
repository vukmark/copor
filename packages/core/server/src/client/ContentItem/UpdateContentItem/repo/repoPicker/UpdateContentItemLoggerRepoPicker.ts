import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateContentItemLoggerRepo
} from '@copor/core/client/ContentItem/UpdateContentItem/repo/fake/FakeUpdateContentItemLoggerRepo';
import {LogDataForUpdateContentItem} from '@copor/core/domain/ContentItem/logger/LogUpdateContentItem';

export class UpdateContentItemLoggerRepoPicker extends
	NewRepositoryPicker<LogRepository<LogDataForUpdateContentItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateContentItem>> {
		return {
			[DBEnv.FAKE]: FakeUpdateContentItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}