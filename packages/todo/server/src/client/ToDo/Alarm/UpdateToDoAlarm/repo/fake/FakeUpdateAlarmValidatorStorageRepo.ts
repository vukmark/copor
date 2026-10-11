import {ValidateUpdateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateUpdateAlarmRepo';
import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';


export class FakeUpdateAlarmValidatorStorageRepo implements ValidateUpdateAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidAlarmable(type: AlarmableType | undefined, id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
