import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateSetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/ValidateSetUserGroupUserListRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeSetUserGroupUserListValidatorStorageRepo
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/fake/FakeSetUserGroupUserListValidatorStorageRepo';
import {
	KyselySetUserGroupUserListValidatorStorageRepo
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/kysely/KyselySetUserGroupUserListValidatorStorageRepo';

export class SetUserGroupUserListValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateSetUserGroupUserListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateSetUserGroupUserListRepo> {
		return {
			[DBEnv.FAKE]: FakeSetUserGroupUserListValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselySetUserGroupUserListValidatorStorageRepo
		};
	}
}