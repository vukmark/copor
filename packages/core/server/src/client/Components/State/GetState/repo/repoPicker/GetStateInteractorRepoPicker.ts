import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetStateInteractorRepo} from '@copor/core/client/Components/State/GetState/repo/fake/FakeGetStateInteractorRepo';
import {
	KyselyGetStateInteractorRepo
} from '@copor/core/client/Components/State/GetState/repo/kysely/KyselyGetStateInteractorRepo';

export class GetStateInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetStateDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetStateDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetStateInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetStateInteractorRepo
		};
	}
}