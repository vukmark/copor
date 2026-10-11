import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFileValidatorStorageRepo} from '../fake/FakeGetFileValidatorStorageRepo';
import {ValidateGetFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateGetFileRepo';
import {KyselyGetFileValidatorStorageRepo} from '@copor/cloud/client/Cloud/GetFile/repo/kysely/KyselyGetFileValidatorStorageRepo';

export class GetFileValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetFileRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetFileRepo> {
		return {
			[DBEnv.FAKE]: FakeGetFileValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetFileValidatorStorageRepo
		};
	}
}
