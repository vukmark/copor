import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAlarmListInteractorRepo} from '../fake/FakeGetAlarmListInteractorRepo';
import {KyselyGetAlarmListInteractorRepo} from '@copor/todo/client/ToDo/Alarm/GetAlarmList/repo/kysely/KyselyGetAlarmListInteractorRepo';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';

export class GetAlarmListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetAlarmDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetAlarmDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetAlarmListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAlarmListInteractorRepo
		};
	}
}
