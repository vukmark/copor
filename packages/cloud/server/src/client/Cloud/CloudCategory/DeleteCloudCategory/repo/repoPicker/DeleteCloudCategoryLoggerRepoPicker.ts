import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteCloudCategoryLoggerRepo
} from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/fake/FakeDeleteCloudCategoryLoggerRepo';
import {LogDataForDeleteCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogDeleteCloudCategory';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteCloudCategoryLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteCloudCategory>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteCloudCategory>> {
		return {
			[DBEnv.FAKE]: FakeDeleteCloudCategoryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
