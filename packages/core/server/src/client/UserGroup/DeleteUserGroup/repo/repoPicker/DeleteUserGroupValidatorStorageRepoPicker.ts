import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/fake/FakeDeleteUserGroupValidatorStorageRepo';
import {ValidateDeleteUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateDeleteUserGroupRepo';
import {
	KyselyDeleteUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/kysely/KyselyDeleteUserGroupValidatorStorageRepo';

export class DeleteUserGroupValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserGroupValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteUserGroupValidatorStorageRepo
		};
	}
}
