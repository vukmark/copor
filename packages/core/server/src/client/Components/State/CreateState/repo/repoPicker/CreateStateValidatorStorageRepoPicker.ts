import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateCreateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateCreateStateRepo';
import {
    FakeCreateStateValidatorStorageRepo
} from '@copor/core/client/Components/State/CreateState/repo/fake/FakeCreateStateValidatorStorageRepo';
import {
    KyselyCreateStateValidatorStorageRepo
} from '@copor/core/client/Components/State/CreateState/repo/kysely/KyselyCreateStateValidatorStorageRepo';

export class CreateStateValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateCreateStateRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateStateRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateStateValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateStateValidatorStorageRepo
		};
	}
}