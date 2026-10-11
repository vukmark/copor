import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetStateListInteractorRepo} from '../fake/FakeGetStateListInteractorRepo';
import {KyselyGetStateListInteractorRepo} from '@copor/core/client/Components/State/GetStateList/repo/kysely/KyselyGetStateListInteractorRepo';
import {GetStateListRepo} from '@copor/core/domain/Components/State/repository/GetStateListRepo';

export class GetStateListInteractorRepoPicker extends NewRepositoryPicker<GetStateListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetStateListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetStateListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetStateListInteractorRepo
		};
	}
}
