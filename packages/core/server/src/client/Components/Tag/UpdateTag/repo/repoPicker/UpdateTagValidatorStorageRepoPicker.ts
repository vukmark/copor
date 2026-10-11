import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateTagValidatorStorageRepo} from '../fake/FakeUpdateTagValidatorStorageRepo';
import {ValidateUpdateTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateUpdateTagRepo';
import {
	KyselyUpdateTagValidatorStorageRepo
} from '@copor/core/client/Components/Tag/UpdateTag/repo/kysely/KyselyUpdateTagValidatorStorageRepo';

export class UpdateTagValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateUpdateTagRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateUpdateTagRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateTagValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateTagValidatorStorageRepo
		};
	}
}
