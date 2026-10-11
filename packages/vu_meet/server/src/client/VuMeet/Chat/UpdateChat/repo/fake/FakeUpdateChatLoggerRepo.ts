import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogUpdateChat';

export class FakeUpdateChatLoggerRepo implements LogRepository<LogDataForUpdateChat> {
	save(logDTO: LogForSave<LogDataForUpdateChat>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
