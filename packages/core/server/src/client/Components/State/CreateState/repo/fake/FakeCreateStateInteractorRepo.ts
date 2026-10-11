import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateStateInteractorRepo implements SaveItem<SaveStateDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveStateDTO): Promise<void> {
		return Promise.resolve();
	}
}