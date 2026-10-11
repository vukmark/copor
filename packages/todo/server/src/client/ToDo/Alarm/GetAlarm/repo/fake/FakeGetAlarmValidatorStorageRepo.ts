import {ValidateGetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateGetAlarmRepo';

export class FakeGetAlarmValidatorStorageRepo implements ValidateGetAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
