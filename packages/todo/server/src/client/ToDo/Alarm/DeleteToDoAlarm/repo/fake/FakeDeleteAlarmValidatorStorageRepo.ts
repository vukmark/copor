import {ValidateDeleteAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateDeleteAlarmRepo';

export class FakeDeleteAlarmValidatorStorageRepo implements ValidateDeleteAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}