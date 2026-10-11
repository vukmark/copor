import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateStateValidatorStorageRepo} from '@copor/core/client/Components/State/UpdateState/repo/fake/FakeUpdateStateValidatorStorageRepo';
import {ValidateUpdateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateUpdateStateRepo';
import {
	KyselyUpdateStateValidatorStorageRepo
} from '@copor/core/client/Components/State/UpdateState/repo/kysely/KyselyUpdateStateValidatorStorageRepo';

export class UpdateStateValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateStateRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateStateRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateStateValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateStateValidatorStorageRepo
		};
	}
}
