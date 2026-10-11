import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetContractTypeListInteractorRepo} from '../fake/FakeGetContractTypeListInteractorRepo';
import {KyselyGetContractTypeListInteractorRepo}
	from '@copor/core/client/Components/ContractType/GetContractTypeList/repo/kysely/KyselyGetContractTypeListInteractorRepo';

export class GetContractTypeListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetContractTypeDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetContractTypeDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetContractTypeListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetContractTypeListInteractorRepo
		};
	}
}
