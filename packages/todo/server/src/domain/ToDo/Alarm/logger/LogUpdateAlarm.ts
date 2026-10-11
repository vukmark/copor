import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export class LogUpdateAlarm extends TypedLogger<LogDataForUpdateAlarm> {
	getType(): string {
		return 'updateAlarm';
	}
}

export interface LogDataForUpdateAlarm {
	id: string;
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmTime: Date;
	repeatFrequency: AlarmRepeatFrequency;
	alarmStatus: AlarmStatus;
}