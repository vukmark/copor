import {SaveToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/SaveToDoCommentRepo';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';

export class FakeUpdateToDoCommentInteractorRepo implements SaveToDoCommentRepo {
	save(saveDTO: SaveToDoCommentDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
