import {ValidateGetAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateGetAttachmentForToDoRepo';

export class FakeGetAttachmentForToDoValidatorStorageRepo implements ValidateGetAttachmentForToDoRepo {
	isInvalidToDoAttachment(attachmentId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isForbiddenAttachmentForToDoAccess(attachmentId: string, actorId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
