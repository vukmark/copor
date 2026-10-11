import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/SaveContractTypeRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateContractTypeInteractorRepo} from '../fake/FakeUpdateContractTypeInteractorRepo';
import {
    KyselyUpdateContractTypeInteractorRepo
} from '@copor/core/client/Components/ContractType/UpdateContractType/repo/kysely/KyselyUpdateContractTypeInteractorRepo';

export class UpdateContractTypeInteractorRepoPicker extends NewRepositoryPicker<SaveContractTypeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveContractTypeRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateContractTypeInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateContractTypeInteractorRepo
		};
	}
}
