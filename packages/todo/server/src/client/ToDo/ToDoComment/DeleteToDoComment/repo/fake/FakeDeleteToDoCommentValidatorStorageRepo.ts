import {ValidateDeleteToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/ValidateDeleteToDoCommentRepo';

export class FakeDeleteToDoCommentValidatorStorageRepo implements ValidateDeleteToDoCommentRepo {
	isInvalidToDoComment(toDoCommentId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}