import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetTenantListInteractorRepo
} from '@copor/core/client/Components/Tenant/GetTenantList/repo/fake/FakeGetTenantListInteractorRepo';
import {
	KyselyGetBaseTenantListInteractorRepo
} from '@copor/core/client/Components/Tenant/GetBaseTenantList/repo/kysely/KyselyGetBaseTenantListInteractorRepo';

export class GetBaseTenantListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetTenantDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetTenantDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetTenantListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetBaseTenantListInteractorRepo
		};
	}
}
