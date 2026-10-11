import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetChatWithUser} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatWithUser';

export class FakeGetChatWithUserLoggerRepo implements LogRepository<LogDataForGetChatWithUser> {
	save(logDTO: LogForSave<LogDataForGetChatWithUser>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
