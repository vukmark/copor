import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteContractTypeRepo}
	from '@copor/core/domain/Components/ContractType/repository/ValidateDeleteContractTypeRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteContractTypeValidatorStorageRepo} from '../fake/FakeDeleteContractTypeValidatorStorageRepo';
import {KyselyDeleteContractTypeValidatorStorageRepo}
	from '@copor/core/client/Components/ContractType/DeleteContractType/repo/kysely/KyselyDeleteContractTypeValidatorStorageRepo';

export class DeleteContractTypeValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteContractTypeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteContractTypeRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteContractTypeValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteContractTypeValidatorStorageRepo
		};
	}
}