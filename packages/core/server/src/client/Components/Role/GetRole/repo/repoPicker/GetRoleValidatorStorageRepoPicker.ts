import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateGetRoleRepo';
import {IsInvalidRoleRepo} from '@copor/core/domain/Components/Role/repository/IsInvalidRoleRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRoleValidatorStorageRepo} from '../fake/FakeGetRoleValidatorStorageRepo';

export class GetRoleValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetRoleRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidRoleRepo> {
		return {
			[DBEnv.KYSELY]: FakeGetRoleValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetRoleValidatorStorageRepo
		};
	}
}
