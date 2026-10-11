import {ValidateCreateAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateCreateAttachmentForToDoRepo';

export class FakeCreateAttachmentForToDoValidatorStorageRepo implements ValidateCreateAttachmentForToDoRepo {
	isInvalidToDo(taskId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isForbiddenToDoAttachmentAccess(todoId: string, actorId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
