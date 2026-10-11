import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetTenantValidatorStorageRepo} from '../fake/FakeGetTenantValidatorStorageRepo';
import {ValidateGetTenantRepo} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateGetTenantRepo';
import {IsInvalidTenantRepo} from '@copor/core/domain/Components/Tenant/repository/IsInvalidTenantRepo';

export class GetTenantValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetTenantRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidTenantRepo> {
		return {
			[DBEnv.FAKE]: FakeGetTenantValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeGetTenantValidatorStorageRepo
		};
	}
}
