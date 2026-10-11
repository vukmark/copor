import {db} from '@copor/core/client/AppDataSource';
import {SavePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/SavePrivateToDoRepo';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyUpdatePrivateToDoInteractorRepo
	extends TimeTransformer
	implements SavePrivateToDoRepo {
	async save(saveDTO: SavePrivateToDoDTO): Promise<void> {
		await db
			.updateTable('privateToDo')
			.set({
				actorId: saveDTO.actorId,
				title: saveDTO.title,
				priority: saveDTO.priority.toString(),
				isDisplayedInCalendar: saveDTO.isDisplayedInCalendar,
				progress: saveDTO.progress?.toString() ?? null,
				deadline: saveDTO.deadline ? this.toUtc(saveDTO.deadline) : undefined,
				scheduledTime: saveDTO.scheduledTime ? this.toUtc(saveDTO.scheduledTime) : undefined,
				isPinned: saveDTO.isPinned
			})
			.where('id', '=', saveDTO.id)
			.execute();

		await db
			.deleteFrom('toDoTagMap')
			.where('toDoId', '=', saveDTO.id)
			.execute();

		if (saveDTO.tagList && saveDTO.tagList.length > 0) {
			const tagInserts = saveDTO.tagList.map((tag) => ({
				toDoId: saveDTO.id,
				tagId: tag
			}));

			await db
				.insertInto('toDoTagMap')
				.values(tagInserts)
				.execute();
		}
	}
}
