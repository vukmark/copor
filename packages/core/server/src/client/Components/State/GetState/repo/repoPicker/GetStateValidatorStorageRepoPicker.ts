import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetStateRepo} from '@copor/core/domain/Components/State/repository/ValidateGetStateRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetStateValidatorStorageRepo} from '@copor/core/client/Components/State/GetState/repo/fake/FakeGetStateValidatorStorageRepo';
import {
	KyselyGetStateValidatorStorageRepo
} from '@copor/core/client/Components/State/GetState/repo/kysely/KyselyGetStateValidatorStorageRepo';

export class GetStateValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetStateRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetStateRepo> {
		return {
			[DBEnv.FAKE]: FakeGetStateValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetStateValidatorStorageRepo
		};
	}
}
