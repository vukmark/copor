import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateDeleteContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateDeleteContentItemRepo';
import {
	FakeDeleteContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/fake/FakeDeleteContentItemValidatorStorageRepo';
import {
	KyselyDeleteContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/kysely/KyselyDeleteContentItemValidatorStorageRepo';

export class DeleteContentItemValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteContentItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteContentItemRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteContentItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteContentItemValidatorStorageRepo
		};
	}
}