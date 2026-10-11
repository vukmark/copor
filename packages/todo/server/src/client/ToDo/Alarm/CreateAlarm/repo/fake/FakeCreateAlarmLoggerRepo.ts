import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogCreateAlarm';


export class FakeCreateAlarmLoggerRepo implements LogRepository<LogDataForCreateAlarm> {
	save(logDTO: LogForSave<LogDataForCreateAlarm>): Promise<void> {
		return Promise.resolve();
	}
}
