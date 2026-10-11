import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {
	ValidateUpdateUserGroupRepo
} from '@copor/core/domain/UserGroup/repository/ValidateUpdateUserGroupRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserGroupValidatorStorageRepo} from '../fake/FakeUpdateUserGroupValidatorStorageRepo';
import {
	KyselyUpdateUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/UpdateUserGroup/repo/kysely/KyselyUpdateUserGroupValidatorStorageRepo';

export class UpdateUserGroupValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserGroupValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserGroupValidatorStorageRepo
		};
	}
}
