import {SaveRegionRepo} from '@copor/core/domain/Components/Region/repository/SaveRegionRepo';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';

export class FakeUpdateRegionInteractorRepo implements SaveRegionRepo {
	save(saveDTO: SaveRegionDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
