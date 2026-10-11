import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export interface ValidateCreateAlarmDTO {
	actorId: string;
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmTime: Date;
}