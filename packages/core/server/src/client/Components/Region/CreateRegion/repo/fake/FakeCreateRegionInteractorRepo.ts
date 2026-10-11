import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateRegionInteractorRepo implements SaveItem<SaveRegionDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveRegionDTO): Promise<void> {
		return Promise.resolve();
	}
}
