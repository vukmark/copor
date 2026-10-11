import {ValidateGetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateGetAlarmRepo';
import {AlarmKyselyHelper} from '@copor/todo/client/ToDo/Alarm/repositoryHelper/AlarmKyselyHelper';

export class KyselyGetAlarmValidatorStorageRepo implements ValidateGetAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean> {
		return AlarmKyselyHelper.isInvalidAlarm(alarmId);
	}
}