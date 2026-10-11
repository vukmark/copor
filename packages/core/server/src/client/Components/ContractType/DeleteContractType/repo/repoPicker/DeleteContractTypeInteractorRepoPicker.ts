import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteContractTypeInteractorRepo} from '../fake/FakeDeleteContractTypeInteractorRepo';
import {
    KyselyDeleteContractTypeInteractorRepo
} from '@copor/core/client/Components/ContractType/DeleteContractType/repo/kysely/KyselyDeleteContractTypeInteractorRepo';

export class DeleteContractTypeInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteContractTypeInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteContractTypeInteractorRepo
		};
	}
}
