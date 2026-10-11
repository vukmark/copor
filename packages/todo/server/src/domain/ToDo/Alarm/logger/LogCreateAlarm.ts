import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export class LogCreateAlarm extends TypedLogger<LogDataForCreateAlarm> {
	getType() {
		return 'createAlarm';
	}
}

export interface LogDataForCreateAlarm {
	id: string;
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmTime: Date;
	repeatFrequency: AlarmRepeatFrequency;
	alarmStatus: AlarmStatus;
}