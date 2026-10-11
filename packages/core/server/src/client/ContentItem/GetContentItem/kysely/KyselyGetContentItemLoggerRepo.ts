import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetContentItem} from '@copor/core/domain/ContentItem/logger/LogGetContentItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyGetContentItemLoggerRepo
implements LogRepository<LogDataForGetContentItem> {
	save(logDTO: LogForSave<LogDataForGetContentItem>): Promise<void> {
		return Promise.resolve();
	}
}