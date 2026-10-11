import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateContentItem} from '@copor/core/domain/ContentItem/logger/LogUpdateContentItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateContentItemLoggerRepo
implements LogRepository<LogDataForUpdateContentItem> {
	save(logDTO: LogForSave<LogDataForUpdateContentItem>): Promise<void> {
		return Promise.resolve(undefined);
	}
}