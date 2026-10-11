import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCloudCategoryLoggerRepo} from '../fake/FakeGetCloudCategoryLoggerRepo';
import {LogDataForGetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogGetCloudCategory';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetCloudCategoryLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetCloudCategory>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetCloudCategory>> {
		return {
			[DBEnv.KYSELY]: FakeGetCloudCategoryLoggerRepo,
			[DBEnv.FAKE]: KyselyLogRepository
		};
	}
}
