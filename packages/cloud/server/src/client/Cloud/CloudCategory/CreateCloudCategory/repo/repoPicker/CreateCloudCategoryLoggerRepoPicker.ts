import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateCloudCategoryLoggerRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/repo/fake/FakeCreateCloudCategoryLoggerRepo';
import {LogDataForCreateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogCreateCloudCategory';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateCloudCategoryLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateCloudCategory>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateCloudCategory>> {
		return {
			[DBEnv.FAKE]: FakeCreateCloudCategoryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
