import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    KyselyGetContractTypeInteractorRepo
} from '@copor/core/client/Components/ContractType/GetContractType/repo/kysely/KyselyGetContractTypeInteractorRepo';
import {FakeGetContractTypeInteractorRepo} from '../fake/FakeGetContractTypeInteractorRepo';

export class GetContractTypeInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetContractTypeDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetContractTypeDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetContractTypeInteractorRepo,
			[DBEnv.FAKE]: FakeGetContractTypeInteractorRepo
		};
	}
}
