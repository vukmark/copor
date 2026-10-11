import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';


export class FakeCreatePrivateToDoInteractorRepo implements SaveItem<SavePrivateToDoDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SavePrivateToDoDTO): Promise<void> {
		return Promise.resolve();
	}
}
