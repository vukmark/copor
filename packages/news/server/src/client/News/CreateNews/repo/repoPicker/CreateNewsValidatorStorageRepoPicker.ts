import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateCreateNewsRepo} from '@copor/news/domain/News/repository/ValidateCreateNewsRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNewsValidatorStorageRepo} from '@copor/news/client/News/CreateNews/repo/fake/FakeCreateNewsValidatorStorageRepo';
import {
	KyselyCreateNewsValidatorStorageRepo
} from '@copor/news/client/News/CreateNews/repo/kysely/KyselyCreateNewsValidatorStorageRepo';

export class CreateNewsValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateNewsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateCreateNewsRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateNewsValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateNewsValidatorStorageRepo
		};
	}
}