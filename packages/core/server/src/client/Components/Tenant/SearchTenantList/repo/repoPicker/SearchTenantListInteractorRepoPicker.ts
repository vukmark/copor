import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SearchTenantListRepo} from '@copor/core/domain/Components/Tenant/repository/SearchTenantListRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSearchTenantListInteractorRepo} from '../fake/FakeSearchTenantListInteractorRepo';

export class SearchTenantListInteractorRepoPicker extends NewRepositoryPicker<SearchTenantListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SearchTenantListRepo> {
		return {
			[DBEnv.FAKE]: FakeSearchTenantListInteractorRepo,
			[DBEnv.KYSELY]: FakeSearchTenantListInteractorRepo
		};
	}
}