import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateDeleteTenantRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteTenantValidatorStorageRepo} from '../fake/FakeDeleteTenantValidatorStorageRepo';
import {KyselyDeleteTenantValidatorStorageRepo}
	from '@copor/core/client/Components/Tenant/DeleteTenant/repo/kysely/KyselyDeleteTenantValidatorStorageRepo';

export class DeleteTenantValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteTenantRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteTenantRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteTenantValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteTenantValidatorStorageRepo
		};
	}
}
