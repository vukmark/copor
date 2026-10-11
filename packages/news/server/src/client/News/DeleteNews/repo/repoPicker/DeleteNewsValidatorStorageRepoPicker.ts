import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteNewsRepo} from '@copor/news/domain/News/repository/ValidateDeleteNewsRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteNewsValidatorStorageRepo} from '@copor/news/client/News/DeleteNews/repo/fake/FakeDeleteNewsValidatorStorageRepo';
import {
	KyselyDeleteNewsValidatorStorageRepo
} from '@copor/news/client/News/DeleteNews/repo/kysely/KyselyDeleteNewsValidatorStorageRepo';

export class DeleteNewsValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteNewsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteNewsRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteNewsValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteNewsValidatorStorageRepo
		};
	}
}