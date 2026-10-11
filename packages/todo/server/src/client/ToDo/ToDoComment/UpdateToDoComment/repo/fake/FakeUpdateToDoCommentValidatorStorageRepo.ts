import {ValidateUpdateToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/validations/repository/ValidateUpdateToDoComment';

export class FakeUpdateToDoCommentValidatorStorageRepo implements ValidateUpdateToDoCommentRepo {
	isInvalidToDo(taskId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	isInvalidToDoComment(toDoCommentId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

}
