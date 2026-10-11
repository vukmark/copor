import {ValidateCreateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateCreateAlarmRepo';
import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export class FakeCreateAlarmValidatorStorageRepo implements ValidateCreateAlarmRepo {
	isInvalidAlarmable(type: AlarmableType | undefined, id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}