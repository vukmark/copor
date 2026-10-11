import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateAlarmInteractorRepo} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/fake/FakeCreateAlarmInteractorRepo';
import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {
	KyselyCreateAlarmInteractorRepo
} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/kysely/KyselyCreateAlarmInteractorRepo';


export class CreateAlarmInteractorRepoPicker extends NewRepositoryPicker<SaveAlarmRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveAlarmRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateAlarmInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateAlarmInteractorRepo
		};
	}
}
