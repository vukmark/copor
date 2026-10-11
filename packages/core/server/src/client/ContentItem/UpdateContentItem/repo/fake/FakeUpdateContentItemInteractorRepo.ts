import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';

export class FakeUpdateContentItemInteractorRepo implements SaveContentItemRepo {
	save(saveDTO: SaveContentItemDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}