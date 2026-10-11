import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForGetMessageList
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetMessageList';

export class FakeGetMessageListLoggerRepo implements LogRepository<LogDataForGetMessageList> {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
