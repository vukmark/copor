import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogSearchAllMessages';

export class FakeSearchAllMessagesLoggerRepo implements LogRepository<LogDataForSearchAllMessages> {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
