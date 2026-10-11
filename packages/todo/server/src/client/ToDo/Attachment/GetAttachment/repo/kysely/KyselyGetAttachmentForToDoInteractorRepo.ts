import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/GetAttachmentForToDoDTO';
import {db} from '@copor/core/client/AppDataSource';
import * as fs from 'node:fs/promises';
import path from 'node:path';

export class KyselyGetAttachmentForToDoInteractorRepo implements GetItem<GetAttachmentForToDoDTO> {
	async load(id: string): Promise<GetAttachmentForToDoDTO> {
		const attachment = await db
			.selectFrom('toDoAttachment')
			.select('name')
			.where('id', '=', id)
			.executeTakeFirst();

		if (!attachment) {
			throw new Error(`Attachment with id ${id} not found`);
		}

		const extension = attachment.name.split('.').pop();
		const folder = path.join(process.env.MEDIA_FILES_FOLDER!, 'ToDo', id.substring(0, 3));
		const filePath = path.join(folder, `${id}.${extension}`);
		const file = await fs.readFile(filePath);

		return {
			file,
			fileName: attachment.name
		};
	}
}
