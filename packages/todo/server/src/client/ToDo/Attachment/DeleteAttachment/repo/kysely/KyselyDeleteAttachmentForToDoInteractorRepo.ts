import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';
import {ToDoFileHelper} from '@copor/todo/client/ToDo/ToDoFileHelper';

export class KyselyDeleteAttachmentForToDoInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		const attachment = await db
			.selectFrom('toDoAttachment')
			.select('name')
			.where('id', '=', itemId)
			.executeTakeFirst();

		if (!attachment)
			return;

		await db
			.deleteFrom('toDoAttachment')
			.where('id', '=', itemId)
			.execute();

		const extension = attachment.name.split('.').pop()!;

		await ToDoFileHelper.deleteFile({fileId: itemId}, extension);
	}
}
