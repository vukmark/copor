import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetAlarmInteractorRepo} from '@copor/todo/client/ToDo/Alarm/GetAlarm/repo/kysely/KyselyGetAlarmInteractorRepo';
import {FakeGetAlarmInteractorRepo} from '../fake/FakeGetAlarmInteractorRepo';
import {GetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/GetAlarmRepo';

export class GetAlarmInteractorRepoPicker extends NewRepositoryPicker<GetAlarmRepo> {
	protected getRepositoryList(): Record<string, new () => GetAlarmRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetAlarmInteractorRepo,
			[DBEnv.FAKE]: FakeGetAlarmInteractorRepo
		};
	}
}
