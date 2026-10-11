import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateNewsRepo} from '@copor/news/domain/News/repository/ValidateUpdateNewsRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateNewsValidatorStorageRepo} from '@copor/news/client/News/UpdateNews/repo/fake/FakeUpdateNewsValidatorStorageRepo';
import {KyselyGetNewsValidatorStorageRepo} from '@copor/news/client/News/GetNews/repo/kysely/KyselyGetNewsValidatorStorageRepo';

export class UpdateNewsValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateUpdateNewsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateNewsRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateNewsValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetNewsValidatorStorageRepo
		};
	}
}