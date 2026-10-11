import {SavePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/SavePrivateToDoRepo';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';


export class FakeUpdatePrivateToDoInteractorRepo implements SavePrivateToDoRepo {
	save(saveDTO: SavePrivateToDoDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
