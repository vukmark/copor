import {ValidateGetToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/validations/repository/ValidateGetToDoCommentRepo';

export class FakeGetToDoCommentValidatorStorageRepo implements ValidateGetToDoCommentRepo {
	isInvalidToDoComment(toDoCommentId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
