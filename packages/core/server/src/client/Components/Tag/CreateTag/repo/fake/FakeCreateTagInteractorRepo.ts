import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';

export class FakeCreateTagInteractorRepo implements SaveItem<SaveTagDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveTagDTO): Promise<void> {
		return Promise.resolve();
	}
}
