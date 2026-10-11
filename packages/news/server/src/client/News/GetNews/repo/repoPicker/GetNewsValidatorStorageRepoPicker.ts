import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetNewsRepo} from '@copor/news/domain/News/repository/ValidateGetNewsRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {IsInvalidNewsRepo} from '@copor/news/domain/News/repository/IsInvalidNewsRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetNewsValidatorStorageRepo} from '@copor/news/client/News/GetNews/repo/kysely/KyselyGetNewsValidatorStorageRepo';
import {FakeGetNewsValidatorStorageRepo} from '@copor/news/client/News/GetNews/repo/fake/FakeGetNewsValidatorStorageRepo';

export class GetNewsValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetNewsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidNewsRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetNewsValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetNewsValidatorStorageRepo
		};
	}
}