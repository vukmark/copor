import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSignContractValidatorStorageRepo} from '../fake/FakeSignContractValidatorStorageRepo';
import {ValidateSignContractRepo} from '@copor/core/domain/Contract/repository/ValidateSignContractRepo';
import {KyselySignContractValidatorStorageRepo}
	from '@copor/core/client/Contract/SignContract/repo/kysely/KyselySignContractValidatorStorageRepo';

export class SignContractValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateSignContractRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateSignContractRepo> {
		return {
			[DBEnv.FAKE]: FakeSignContractValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselySignContractValidatorStorageRepo
		};
	}
}
