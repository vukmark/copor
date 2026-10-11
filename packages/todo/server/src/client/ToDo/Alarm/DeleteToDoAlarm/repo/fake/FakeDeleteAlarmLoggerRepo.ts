import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogDeleteAlarm';

export class FakeDeleteAlarmLoggerRepo implements LogRepository<LogDataForDeleteAlarm> {
	save(logDTO: LogForSave<LogDataForDeleteAlarm>): Promise<void> {
		return Promise.resolve();
	}
}
