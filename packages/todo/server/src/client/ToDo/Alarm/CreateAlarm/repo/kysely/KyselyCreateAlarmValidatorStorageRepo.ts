import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {ValidateCreateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateCreateAlarmRepo';
import {AlarmKyselyHelper} from '@copor/todo/client/ToDo/Alarm/repositoryHelper/AlarmKyselyHelper';

export class KyselyCreateAlarmValidatorStorageRepo implements ValidateCreateAlarmRepo {
	isInvalidAlarmable(type: AlarmableType | undefined, id: string | undefined): Promise<boolean> {
		return AlarmKyselyHelper.isInvalidAlarmable(type, id);
	}
}