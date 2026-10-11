import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetTenantInteractorRepo} from '../fake/FakeGetTenantInteractorRepo';
import {
	KyselyGetTenantInteractorRepo
} from '@copor/core/client/Components/Tenant/GetTenant/repo/kysely/KyselyGetTenantInteractorRepo';

export class GetTenantInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetTenantDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetTenantDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetTenantInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetTenantInteractorRepo
		};
	}
}
