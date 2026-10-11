import {GetAllCommentsForToDoRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetAllCommentsForToDoRepo';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';

export class FakeGetAllCommentsForToDoInteractorRepo implements GetAllCommentsForToDoRepo {
	public list(toDoId: string): Promise<GetToDoCommentDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: 'comment1',
					toDoId: 'toDoId1',
					content: 'content1',
					actorId: 'actor1',
					createdAt: new Date(10, 10, 2012)
				},
				{
					id: 'comment2',
					toDoId: 'toDoId2',
					content: 'content2',
					actorId: 'actor2',
					createdAt: new Date(10, 10, 2012)
				}]
			);
		});
	}
}
