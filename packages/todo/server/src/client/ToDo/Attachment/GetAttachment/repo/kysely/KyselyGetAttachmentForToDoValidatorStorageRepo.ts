import {ValidateGetAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateGetAttachmentForToDoRepo';
import {db} from '@copor/core/client/AppDataSource';
import {ToDoKyselyHelper} from '@copor/todo/client/ToDo/repositoryHelper/ToDoKyselyHelper';

export class KyselyGetAttachmentForToDoValidatorStorageRepo implements ValidateGetAttachmentForToDoRepo {
	async isInvalidToDoAttachment(attachmentId: string | undefined): Promise<boolean> {
		if (!attachmentId)
			return true;

		const attachment = await db
			.selectFrom('toDoAttachment')
			.select('id')
			.where('id', '=', attachmentId)
			.executeTakeFirst();

		return !attachment;
	}

	isForbiddenAttachmentForToDoAccess(attachmentId: string, actorId: string): Promise<boolean> {
		return ToDoKyselyHelper.isForbiddenAttachmentForToDoAccess(attachmentId, actorId);
	}
}
