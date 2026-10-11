import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {
	ValidateGetUserSpecificPermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetUserSpecificPermissionListRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserSpecificPermissionListValidatorStorageRepo} from '../fake/FakeGetUserSpecificPermissionListValidatorStorageRepo';
import {
	KyselyGetUserSpecificPermissionListValidatorStorageRepo
} from '@copor/core/client/Components/Permission/GetUserSpecificPermissionList/repo/kysely/KyselyGetUserSpecificPermissionListValidatorStorageRepo';

export class GetUserSpecificPermissionListValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetUserSpecificPermissionListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsNotValidUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserSpecificPermissionListValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetUserSpecificPermissionListValidatorStorageRepo
		};
	}
}
