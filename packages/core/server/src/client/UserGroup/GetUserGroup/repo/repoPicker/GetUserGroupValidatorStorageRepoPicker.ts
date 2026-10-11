import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateGetUserGroupRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupValidatorStorageRepo} from '../fake/FakeGetUserGroupValidatorStorageRepo';
import {IsInvalidUserGroupRepo} from '@copor/core/domain/UserGroup/repository/IsNotValidUserGroupRepo';
import {
	KyselyGetUserGroupValidatorStorageRepo
} from '@copor/core/client/UserGroup/GetUserGroup/repo/kysely/KyselyGetUserGroupValidatorStorageRepo';

export class GetUserGroupValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupValidatorStorageRepo
		};
	}
}
