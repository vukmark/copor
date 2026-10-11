import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetLogListInteractorRepo} from '../fake/FakeGetLogListInteractorRepo';
import {KyselyGetLogListInteractorRepo} from '@copor/core/client/Log/GetLogList/repo/kysely/KyselyGetLogListInteractorRepo';

export class GetLogListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetLogDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetLogDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetLogListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetLogListInteractorRepo
		};
	}
}
