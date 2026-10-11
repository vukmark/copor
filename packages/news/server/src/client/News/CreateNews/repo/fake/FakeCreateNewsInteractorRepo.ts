import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateNewsInteractorRepo implements SaveItem<SaveNewsDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}

	save(saveDTO: SaveNewsDTO): Promise<void> {
		return Promise.resolve();
	}
}