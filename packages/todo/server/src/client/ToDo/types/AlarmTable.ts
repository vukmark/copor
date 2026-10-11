import {AlarmRepeatFrequency, AlarmStatus, AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export interface AlarmTable {
	id: string;
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmStatus: AlarmStatus;
	alarmTime: Date;
	repeatFrequency: AlarmRepeatFrequency;
}
