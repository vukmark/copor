import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetTagValidatorStorageRepo} from '../fake/FakeGetTagValidatorStorageRepo';
import {ValidateGetTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateGetTagRepo';
import {IsInvalidTagRepo} from '@copor/core/domain/Components/Tag/repository/IsInvalidTagRepo';
import {
    KyselyGetTagValidatorStorageRepo
} from '@copor/core/client/Components/Tag/GetTag/repo/kysely/KyselyGetTagValidatorStorageRepo';

export class GetTagValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetTagRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidTagRepo> {
		return {
			[DBEnv.FAKE]: FakeGetTagValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetTagValidatorStorageRepo
		};
	}
}
