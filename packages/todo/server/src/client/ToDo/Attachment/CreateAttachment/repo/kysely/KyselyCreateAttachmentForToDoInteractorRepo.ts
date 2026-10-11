import {CreateAttachmentToToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/CreateAttachmentToToDoRepo';
import {SaveAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SaveAttachmentForToDoDTO';
import {db} from '@copor/core/client/AppDataSource';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';

export class KyselyCreateAttachmentForToDoInteractorRepo implements CreateAttachmentToToDoRepo {
	async getNewId(): Promise<string> {
		const idGenerator = new IdGenerator();

		return await idGenerator.getNewId();
	}

	async save(saveDTO: SaveAttachmentForToDoDTO): Promise<void> {
		await db
			.insertInto('toDoAttachment')
			.values({
				id: saveDTO.id,
				toDoId: saveDTO.todoId,
				name: saveDTO.name,
				size: saveDTO.size,
				createdBy: saveDTO.actorId
			})
			.execute();
	}
}
