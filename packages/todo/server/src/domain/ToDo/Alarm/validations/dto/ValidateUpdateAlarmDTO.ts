import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export interface ValidateUpdateAlarmDTO {
	id: string;
	actorId: string;
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmTime: Date;
}