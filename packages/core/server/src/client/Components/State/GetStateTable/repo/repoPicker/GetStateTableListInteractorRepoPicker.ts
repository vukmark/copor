import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetStateTableListInteractorRepo} from '../fake/FakeGetStateTableListInteractorRepo';
import {KyselyGetStateTableListInteractorRepo}
	from '@copor/core/client/Components/State/GetStateTable/repo/kysely/KyselyGetStateTableListInteractorRepo';

export class GetStateTableListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetStateDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetStateDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetStateTableListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetStateTableListInteractorRepo
		};
	}
}
