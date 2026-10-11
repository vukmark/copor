import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export interface CreateAlarmReqBodyDTO {
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmTime: Date;
	repeatFrequency: AlarmRepeatFrequency;
	alarmStatus: AlarmStatus;
}
