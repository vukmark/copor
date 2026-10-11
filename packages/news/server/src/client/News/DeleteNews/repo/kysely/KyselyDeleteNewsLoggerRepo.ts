import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteNews} from '@copor/news/domain/News/logger/LogDeleteNews';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyDeleteNewsLoggerRepo implements
    LogRepository<LogDataForDeleteNews> {
	save(logDTO: LogForSave<LogDataForDeleteNews>): Promise<void> {
		return Promise.resolve();
	}
}