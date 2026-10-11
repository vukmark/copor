import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreateTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateCreateTenantRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateTenantValidatorStorageRepo} from '../fake/FakeCreateTenantValidatorStorageRepo';
import {
	KyselyCreateTenantValidatorStorageRepo
} from '@copor/core/client/Components/Tenant/CreateTenant/repo/kysely/KyselyCreateTenantValidatorStorageRepo';

export class CreateTenantValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateCreateTenantRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateTenantRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateTenantValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateTenantValidatorStorageRepo
		};
	}
}
