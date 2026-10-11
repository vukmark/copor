import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateNews} from '@copor/news/domain/News/logger/LogCreateNews';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyCreateNewsLoggerRepo implements LogRepository<LogDataForCreateNews> {
	save(logDTO: LogForSave<LogDataForCreateNews>): Promise<void> {
		return Promise.resolve();
	}
}