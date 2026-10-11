import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export interface ValidateAlarmableDTO {
	alarmableId: string;
	alarmableType: AlarmableType;
}