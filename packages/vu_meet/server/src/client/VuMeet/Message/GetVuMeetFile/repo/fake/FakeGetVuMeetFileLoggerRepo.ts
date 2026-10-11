import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetVuMeetFile';

export class FakeGetVuMeetFileLoggerRepo implements LogRepository<LogDataForGetVuMeetFile> {
	save(logDTO: LogForSave<LogDataForGetVuMeetFile>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
