import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {ValidateUpdateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateUpdateAlarmRepo';
import {AlarmKyselyHelper} from '@copor/todo/client/ToDo/Alarm/repositoryHelper/AlarmKyselyHelper';

export class KyselyUpdateAlarmValidatorStorageRepo implements ValidateUpdateAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean> {
		return AlarmKyselyHelper.isInvalidAlarm(alarmId);
	}
	isInvalidAlarmable(type: AlarmableType | undefined, id: string | undefined): Promise<boolean> {
		return AlarmKyselyHelper.isInvalidAlarmable(type, id);
	}
}