import {CreateAttachmentToToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/CreateAttachmentToToDoRepo';
import {SaveAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SaveAttachmentForToDoDTO';

export class FakeCreateAttachmentForToDoInteractorRepo implements CreateAttachmentToToDoRepo {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveAttachmentForToDoDTO): Promise<void> {
		return Promise.resolve();
	}
}
