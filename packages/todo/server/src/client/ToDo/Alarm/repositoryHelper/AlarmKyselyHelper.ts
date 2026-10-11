import {KyselyGlobalRepositoryHelper} from '@copor/core/client/Core/repositoryHelper/KyselyGlobalRepositoryHelper';
import {AlarmableType} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {ToDoKyselyHelper} from '@copor/todo/client/ToDo/repositoryHelper/ToDoKyselyHelper';

export class AlarmKyselyHelper {
	public static async isInvalidAlarm(id: string | undefined) {
		return KyselyGlobalRepositoryHelper.isInvalidRecord('alarm', id);
	}
	public static async isInvalidAlarmable(type: AlarmableType | undefined, id: string | undefined) {
		switch (type) {
			case AlarmableType.PRIVATE_TODO :
				return ToDoKyselyHelper.isInvalidPrivateToDo(id);
			default :
				return false;
		}
	}
}