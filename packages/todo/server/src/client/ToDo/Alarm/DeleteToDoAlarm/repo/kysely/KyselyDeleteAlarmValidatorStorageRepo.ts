import {ValidateDeleteAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateDeleteAlarmRepo';
import {AlarmKyselyHelper} from '@copor/todo/client/ToDo/Alarm/repositoryHelper/AlarmKyselyHelper';

export class KyselyDeleteAlarmValidatorStorageRepo implements ValidateDeleteAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean> {
		return AlarmKyselyHelper.isInvalidAlarm(alarmId);
	}
}