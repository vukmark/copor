import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateUpdateContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateUpdateContentItemRepo';
import {
	FakeUpdateContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/UpdateContentItem/repo/fake/FakeUpdateContentItemValidatorStorageRepo';
import {
	KyselyGetContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/GetContentItem/kysely/KyselyGetContentItemValidatorStorageRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';

export class UpdateContentItemValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateUpdateContentItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateContentItemRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateContentItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetContentItemValidatorStorageRepo
		};
	}
}