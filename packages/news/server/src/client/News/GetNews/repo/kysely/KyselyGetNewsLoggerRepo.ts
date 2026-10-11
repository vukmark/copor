import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetNews} from '@copor/news/domain/News/logger/LogGetNews';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyGetNewsLoggerRepo implements
    LogRepository<LogDataForGetNews> {
	save(logDTO: LogForSave<LogDataForGetNews>): Promise<void> {
		return Promise.resolve();
	}
}