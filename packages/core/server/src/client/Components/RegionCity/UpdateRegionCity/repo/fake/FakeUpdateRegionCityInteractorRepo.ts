import {SaveRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/SaveRegionCityRepo';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';

export class FakeUpdateRegionCityInteractorRepo implements SaveRegionCityRepo {
	save(saveDTO: SaveRegionCityDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}