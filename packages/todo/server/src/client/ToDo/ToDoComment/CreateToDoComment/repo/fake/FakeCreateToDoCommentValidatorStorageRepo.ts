import {ValidateCreateToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/ValidateCreateToDoCommentRepo';

export class FakeCreateToDoCommentValidatorStorageRepo implements ValidateCreateToDoCommentRepo {
	isInvalidToDo(taskId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}