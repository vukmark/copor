import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {
	LogDataForCreateMessage
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogCreateMessage';

export class FakeCreateMessageLoggerRepo implements LogRepository<LogDataForCreateMessage> {
	save(logDTO: LogForSave<LogDataForCreateMessage>): Promise<void> {
		return Promise.resolve();
	}
}
