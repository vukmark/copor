import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateTenantInteractorRepo implements SaveItem<SaveTenantDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveTenantDTO): Promise<void> {
		return Promise.resolve();
	}
}
