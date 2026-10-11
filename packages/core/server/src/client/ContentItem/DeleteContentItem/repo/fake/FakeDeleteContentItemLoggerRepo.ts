import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteContentItem} from '@copor/core/domain/ContentItem/logger/LogDeleteContentItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteContentItemLoggerRepo
implements LogRepository<LogDataForDeleteContentItem> {
	save(logDTO: LogForSave<LogDataForDeleteContentItem>): Promise<void> {
		return Promise.resolve();
	}
}