import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogGetCloudCategory';

export class FakeGetCloudCategoryLoggerRepo implements LogRepository<LogDataForGetCloudCategory> {
	save(logDTO: LogForSave<LogDataForGetCloudCategory>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
