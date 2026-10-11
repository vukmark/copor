import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteTenantInteractorRepo} from '../fake/FakeDeleteTenantInteractorRepo';
import {
	KyselyDeleteTenantInteractorRepo
} from '@copor/core/client/Components/Tenant/DeleteTenant/repo/kysely/KyselyDeleteTenantInteractorRepo';

export class DeleteTenantInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteTenantInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteTenantInteractorRepo
		};
	}
}
