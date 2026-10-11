import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {
	LogDataForMarkChatMessagesSeen
} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogMarkChatMessagesSeen';

export class FakeMarkChatMessagesSeenLoggerRepo implements LogRepository<LogDataForMarkChatMessagesSeen> {
	save(logDTO: LogForSave<LogDataForMarkChatMessagesSeen>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
