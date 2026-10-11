import {ValidateCreateAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateCreateAttachmentForToDoRepo';
import {ToDoKyselyHelper} from '@copor/todo/client/ToDo/repositoryHelper/ToDoKyselyHelper';

export class KyselyCreateAttachmentForToDoValidatorStorageRepo implements ValidateCreateAttachmentForToDoRepo {
	async isInvalidToDo(taskId: string | undefined): Promise<boolean> {
		if (!taskId)
			return true;

		return ToDoKyselyHelper.isInvalidPrivateToDo(taskId);
	}

	isForbiddenToDoAttachmentAccess(todoId: string, actorId: string): Promise<boolean> {
		return ToDoKyselyHelper.isForbiddenToDoAccess(todoId, actorId);
	}
}
