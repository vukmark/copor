import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/fake/FakeCreateUserGroupValidatorStorageRepo';
import {ValidateCreateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateCreateUserGroupRepo';
import {
	KyselyCreateUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/kysely/KyselyCreateUserGroupValidatorStorageRepo';

export class CreateUserGroupValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateCreateUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateUserGroupValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateUserGroupValidatorStorageRepo
		};
	}
}
