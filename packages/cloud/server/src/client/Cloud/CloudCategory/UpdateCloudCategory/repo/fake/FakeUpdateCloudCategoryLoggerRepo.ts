import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogCreateCloudCategory';

export class FakeUpdateCloudCategoryLoggerRepo implements LogRepository<LogDataForCreateCloudCategory> {
	save(logDTO: LogForSave<LogDataForCreateCloudCategory>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
