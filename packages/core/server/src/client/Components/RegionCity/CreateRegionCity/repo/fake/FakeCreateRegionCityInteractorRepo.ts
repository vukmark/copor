import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateRegionCityInteractorRepo implements SaveItem<SaveRegionCityDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO:SaveRegionCityDTO): Promise<void> {
		return Promise.resolve();
	}
}