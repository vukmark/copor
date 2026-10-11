import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogGetAlarm';

export class FakeGetAlarmLoggerRepo implements LogRepository<LogDataForGetAlarm> {
	save(logDTO: LogForSave<LogDataForGetAlarm>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
