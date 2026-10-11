import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatInfo';

export class FakeGetChatInfoLoggerRepo implements LogRepository<LogDataForGetChatInfo> {
	save(logDTO: LogForSave<LogDataForGetChatInfo>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
