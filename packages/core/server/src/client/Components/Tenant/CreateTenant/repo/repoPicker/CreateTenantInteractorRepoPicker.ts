import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateTenantInteractorRepo} from '../fake/FakeCreateTenantInteractorRepo';
import {
	KyselyCreateTenantInteractorRepo
} from '@copor/core/client/Components/Tenant/CreateTenant/repo/kysely/KyselyCreateTenantInteractorRepo';

export class CreateTenantInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveTenantDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveTenantDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateTenantInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateTenantInteractorRepo
		};
	}
}
