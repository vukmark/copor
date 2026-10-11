import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';


export class FakeGetToDoCommentInteractorRepo implements GetItem<GetToDoCommentDTO> {
	load(id: string): Promise<GetToDoCommentDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'id',
					toDoId: 'entryId',
					content: 'neki kontent',
					actorId: 'actId',
					createdAt: new Date()
				}
			);
		});
	}
}