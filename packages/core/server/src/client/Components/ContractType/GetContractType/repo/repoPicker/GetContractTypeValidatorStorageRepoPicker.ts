import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/ValidateGetContractTypeRepo';
import {IsInvalidContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/IsInvalidContractTypeRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetContractTypeValidatorStorageRepo} from '../fake/FakeGetContractTypeValidatorStorageRepo';
import {KyselyGetContractTypeValidatorStorageRepo}
	from '@copor/core/client/Components/ContractType/GetContractType/repo/kysely/KyselyGetContractTypeValidatorStorageRepo';

export class GetContractTypeValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetContractTypeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidContractTypeRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetContractTypeValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetContractTypeValidatorStorageRepo
		};
	}
}
