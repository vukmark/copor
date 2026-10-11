import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateCloudCategoryLoggerRepo} from '../fake/FakeUpdateCloudCategoryLoggerRepo';
import {LogDataForUpdateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogUpdateCloudCategory';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateCloudCategoryLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateCloudCategory>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateCloudCategory>> {
		return {
			[DBEnv.FAKE]: FakeUpdateCloudCategoryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
