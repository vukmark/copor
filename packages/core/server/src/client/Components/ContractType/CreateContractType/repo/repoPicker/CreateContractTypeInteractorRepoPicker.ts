import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateContractTypeInteractorRepo} from '../fake/FakeCreateContractTypeInteractorRepo';
import {
    KyselyCreateContractTypeInteractorRepo
} from '@copor/core/client/Components/ContractType/CreateContractType/repo/kysely/KyselyCreateContractTypeInteractorRepo';

export class CreateContractTypeInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveContractTypeDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveContractTypeDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateContractTypeInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateContractTypeInteractorRepo
		};
	}
}
