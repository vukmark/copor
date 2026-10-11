import {db} from '@copor/core/client/AppDataSource';
import {ToDoAttachmentDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/ToDoAttachmentDTO';

export class ToDoKyselyHelper {
	public static async getAttachmentListForToDo(todoId: string): Promise<ToDoAttachmentDTO[]> {
		const attachments = await db
			.selectFrom('toDoAttachment')
			.select(['id', 'name', 'size'])
			.where('toDoId', '=', todoId)
			.execute();

		return attachments;
	}

	public static async isInvalidPrivateToDo(id: string | undefined): Promise<boolean> {
		if (!id)
			return Promise.resolve(true);
		const privateToDo = await db
			.selectFrom('privateToDo')
			.select('id')
			.where('id', '=', id)
			.executeTakeFirst();

		return !privateToDo;
	}

	/**
	 * A todo attachment's parent is a private todo, owned by a single user.
	 */
	public static async isForbiddenToDoAccess(todoId: string, actorId: string): Promise<boolean> {
		const privateToDo = await db
			.selectFrom('privateToDo')
			.select('actorId')
			.where('id', '=', todoId)
			.executeTakeFirst();

		if (privateToDo)
			return privateToDo.actorId !== actorId;

		return true;
	}

	public static async getToDoAttachmentToDoId(attachmentId: string): Promise<string | undefined> {
		const attachment = await db
			.selectFrom('toDoAttachment')
			.select('toDoId')
			.where('id', '=', attachmentId)
			.executeTakeFirst();

		return attachment?.toDoId;
	}

	public static async isForbiddenAttachmentForToDoAccess(attachmentId: string, actorId: string): Promise<boolean> {
		const todoId = await this.getToDoAttachmentToDoId(attachmentId);

		if (!todoId)
			return true;

		return this.isForbiddenToDoAccess(todoId, actorId);
	}
}
