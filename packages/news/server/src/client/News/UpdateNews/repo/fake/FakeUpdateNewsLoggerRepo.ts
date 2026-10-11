import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateNews} from '@copor/news/domain/News/logger/LogUpdateNews';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateNewsLoggerRepo
implements LogRepository<LogDataForUpdateNews> {
	save(logDTO: LogForSave<LogDataForUpdateNews>): Promise<void> {
		return Promise.resolve(undefined);
	}
}