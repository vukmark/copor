import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateUpdateTenantRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateTenantValidatorStorageRepo} from '../fake/FakeUpdateTenantValidatorStorageRepo';
import {
	KyselyUpdateTenantValidatorStorageRepo
} from '@copor/core/client/Components/Tenant/UpdateTenant/repo/kysely/KyselyUpdateTenantValidatorStorageRepo';

export class UpdateTenantValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateTenantRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateTenantRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateTenantValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateTenantValidatorStorageRepo
		};
	}
}
