import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {GetAllCommentsForToDoRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetAllCommentsForToDoRepo';

export class GetAllCommentsForToDo extends
	ExecuteUseCase<string, GetAllCommentsForToDoRepo, GetToDoCommentDTO[]> {
	public execute(): Promise<GetToDoCommentDTO[]> {
		return this.repository.list(this.input);
	}
}