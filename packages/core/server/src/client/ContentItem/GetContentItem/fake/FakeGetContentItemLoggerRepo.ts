import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetContentItem} from '@copor/core/domain/ContentItem/logger/LogGetContentItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetContentItemLoggerRepo
implements LogRepository<LogDataForGetContentItem> {
	save(logDTO: LogForSave<LogDataForGetContentItem>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}