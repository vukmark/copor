import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForSearchMessagesInChat
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogSearchMessagesInChat';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeSearchMessagesInChatLoggerRepo implements LogRepository<LogDataForSearchMessagesInChat> {
	save(logDto: LogForSave<LogDataForSearchMessagesInChat>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
