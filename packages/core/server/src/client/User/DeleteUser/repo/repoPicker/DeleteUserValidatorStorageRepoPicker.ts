import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteUserRepo} from '@copor/core/domain/User/repository/ValidateDeleteUserRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteUserValidatorStorageRepo} from '@copor/core/client/User/DeleteUser/repo/fake/FakeDeleteUserValidatorStorageRepo';
import {KyselyDeleteUserValidatorStorageRepo}
	from '@copor/core/client/User/DeleteUser/repo/kysely/KyselyDeleteUserValidatorStorageRepo';

export class DeleteUserValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteUserRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteUserValidatorStorageRepo
		};
	}
}
