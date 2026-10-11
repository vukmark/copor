import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateContentItem} from '@copor/core/domain/ContentItem/logger/LogCreateContentItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateContentItemLoggerRepo
implements LogRepository<LogDataForCreateContentItem> {
	save(logDTO: LogForSave<LogDataForCreateContentItem>): Promise<void> {
		return Promise.resolve();
	}
}