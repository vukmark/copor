import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    FakeDeleteAlarmInteractorRepo
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/fake/FakeDeleteAlarmInteractorRepo';
import {
    KyselyDeleteAlarmInteractorRepo
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/kysely/KyselyDeleteAlarmInteractorRepo';

export class DeleteAlarmInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteAlarmInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteAlarmInteractorRepo
		};
	}
}
