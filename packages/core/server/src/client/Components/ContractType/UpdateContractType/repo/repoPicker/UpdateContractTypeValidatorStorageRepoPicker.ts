import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateContractTypeRepo}
	from '@copor/core/domain/Components/ContractType/repository/ValidateUpdateContractTypeRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateContractTypeValidatorStorageRepo} from '../fake/FakeUpdateContractTypeValidatorStorageRepo';
import {KyselyUpdateContractTypeValidatorStorageRepo}
	from '@copor/core/client/Components/ContractType/UpdateContractType/repo/kysely/KyselyUpdateContractTypeValidatorStorageRepo';

export class UpdateContractTypeValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateContractTypeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateContractTypeRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateContractTypeValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateContractTypeValidatorStorageRepo
		};
	}
}
