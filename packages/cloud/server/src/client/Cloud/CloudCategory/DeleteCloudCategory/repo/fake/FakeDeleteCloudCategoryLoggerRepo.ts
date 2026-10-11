import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogDeleteCloudCategory';

export class FakeDeleteCloudCategoryLoggerRepo implements LogRepository<LogDataForDeleteCloudCategory> {
	save(logDTO: LogForSave<LogDataForDeleteCloudCategory>): Promise<void> {
		return Promise.resolve();
	}
}
