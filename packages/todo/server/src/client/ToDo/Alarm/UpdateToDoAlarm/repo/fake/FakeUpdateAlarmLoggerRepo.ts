import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogUpdateAlarm';

export class FakeUpdateAlarmLoggerRepo implements LogRepository<LogDataForUpdateAlarm> {
	save(logDTO: LogForSave<LogDataForUpdateAlarm>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
