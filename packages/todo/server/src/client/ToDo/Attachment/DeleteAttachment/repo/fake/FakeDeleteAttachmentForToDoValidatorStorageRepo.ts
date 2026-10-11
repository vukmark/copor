import {ValidateDeleteAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateDeleteAttachmentForToDoRepo';

export class FakeDeleteAttachmentForToDoValidatorStorageRepo implements ValidateDeleteAttachmentForToDoRepo {
	isInvalidToDoAttachment(attachmentId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isForbiddenAttachmentForToDoAccess(attachmentId: string, actorId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
