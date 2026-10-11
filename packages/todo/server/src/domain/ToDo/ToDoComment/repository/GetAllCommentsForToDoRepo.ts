import {GetToDoCommentDTO} from '../interactor/dto/GetToDoCommentDTO';

export interface GetAllCommentsForToDoRepo {
	list(toDoId: string): Promise<GetToDoCommentDTO[]>
}