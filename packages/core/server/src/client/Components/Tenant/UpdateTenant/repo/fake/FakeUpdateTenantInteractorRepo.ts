import {SaveTenantRepo} from '@copor/core/domain/Components/Tenant/repository/SaveTenantRepo';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';

export class FakeUpdateTenantInteractorRepo implements SaveTenantRepo {
	save(saveDTO: SaveTenantDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
