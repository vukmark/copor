import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateImage} from '@copor/core/domain/Components/Image/logger/LogCreateImage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateImageLoggerRepo implements LogRepository<LogDataForCreateImage> {
	save(logDTO: LogForSave<LogDataForCreateImage>): Promise<void> {
		return Promise.resolve();
	}
}
