import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteTagValidatorStorageRepo} from '../fake/FakeDeleteTagValidatorStorageRepo';
import {ValidateDeleteTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateDeleteTagRepo';
import {KyselyDeleteTagValidatorStorageRepo}
	from '@copor/core/client/Components/Tag/DeleteTag/repo/kysely/KyselyDeleteTagValidatorStorageRepo';

export class DeleteTagValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateDeleteTagRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateDeleteTagRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteTagValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteTagValidatorStorageRepo
		};
	}
}