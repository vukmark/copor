import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateContentItemInteractorRepo implements SaveItem<SaveContentItemDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}

	save(saveDTO: SaveContentItemDTO): Promise<void> {
		return Promise.resolve();
	}
}