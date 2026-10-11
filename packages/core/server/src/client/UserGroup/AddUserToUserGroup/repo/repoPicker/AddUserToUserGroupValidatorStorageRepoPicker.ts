import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateAddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateAddUserToUserGroupRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeAddUserToUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/fake/FakeAddUserToUserGroupValidatorStorageRepo';
import {
	KyselyAddUserToUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/kysely/KyselyAddUserToUserGroupValidatorStorageRepo';

export class AddUserToUserGroupValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateAddUserToUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateAddUserToUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeAddUserToUserGroupValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyAddUserToUserGroupValidatorStorageRepo
		};
	}
}