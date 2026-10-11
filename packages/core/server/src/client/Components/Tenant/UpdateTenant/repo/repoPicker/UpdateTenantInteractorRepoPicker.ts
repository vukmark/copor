import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveTenantRepo} from '@copor/core/domain/Components/Tenant/repository/SaveTenantRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateTenantInteractorRepo} from '../fake/FakeUpdateTenantInteractorRepo';
import {
	KyselyUpdateTenantInteractorRepo
} from '@copor/core/client/Components/Tenant/UpdateTenant/repo/kysely/KyselyUpdateTenantInteractorRepo';

export class UpdateTenantInteractorRepoPicker extends NewRepositoryPicker<SaveTenantRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveTenantRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateTenantInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateTenantInteractorRepo
		};
	}
}
