import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateGetContentItemRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {IsInvalidContentItemRepo} from '@copor/core/domain/ContentItem/repository/IsInvalidContentItemRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/GetContentItem/kysely/KyselyGetContentItemValidatorStorageRepo';
import {
	FakeGetContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/GetContentItem/fake/FakeGetContentItemValidatorStorageRepo';

export class GetContentItemValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetContentItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidContentItemRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetContentItemValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetContentItemValidatorStorageRepo
		};
	}
}