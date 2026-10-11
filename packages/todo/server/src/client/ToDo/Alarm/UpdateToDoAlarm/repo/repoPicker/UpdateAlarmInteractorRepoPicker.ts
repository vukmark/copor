import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateAlarmInteractorRepo} from '../fake/FakeUpdateAlarmInteractorRepo';
import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {
    KyselyUpdateAlarmInteractorRepo
} from '@copor/todo/client/ToDo/Alarm/UpdateToDoAlarm/repo/kysely/KyselyUpdateAlarmInteractorRepo';

export class UpdateAlarmInteractorRepoPicker extends NewRepositoryPicker<SaveAlarmRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveAlarmRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateAlarmInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateAlarmInteractorRepo
		};
	}
}
