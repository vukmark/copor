import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteStateRepo} from '@copor/core/domain/Components/State/repository/ValidateDeleteStateRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteStateValidatorStorageRepo} from '@copor/core/client/Components/State/DeleteState/repo/fake/FakeDeleteStateValidatorStorageRepo';
import {KyselyDeleteStateValidatorStorageRepo}
	from '@copor/core/client/Components/State/DeleteState/repo/kysely/KyselyDeleteStateValidatorStorageRepo';

export class DeleteStateValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteStateRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteStateRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteStateValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteStateValidatorStorageRepo
		};
	}
}