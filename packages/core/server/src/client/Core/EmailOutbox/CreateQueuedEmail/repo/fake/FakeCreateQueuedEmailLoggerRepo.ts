import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/logger/LogCreateQueuedEmail';

export class FakeCreateQueuedEmailLoggerRepo implements LogRepository<LogDataForCreateQueuedEmail> {
	save(logDTO: LogForSave<LogDataForCreateQueuedEmail>): Promise<void> {
		return Promise.resolve();
	}
}
