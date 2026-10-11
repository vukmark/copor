import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyCreatePrivateToDoInteractorRepo
	extends TimeTransformer
	implements SaveItem<SavePrivateToDoDTO> {
	async save(saveDTO: SavePrivateToDoDTO): Promise<void> {
		await db
			.insertInto('privateToDo')
			.values({
				id: saveDTO.id,
				actorId: saveDTO.actorId,
				title: saveDTO.title,
				priority: saveDTO.priority.toString(),
				isDisplayedInCalendar: saveDTO.isDisplayedInCalendar,
				progress: saveDTO.progress?.toString() ?? null,
				deadline: saveDTO.deadline ? this.toUtc(saveDTO.deadline) : null,
				scheduledTime: saveDTO.scheduledTime ? this.toUtc(saveDTO.scheduledTime) : null,
				isPinned: saveDTO.isPinned
			})
			.execute();

		if (saveDTO.tagList && saveDTO.tagList.length > 0) {
			const toDoTagPair = saveDTO.tagList.map((tag) => ({
				toDoId: saveDTO.id,
				tagId: tag
			}));

			await db
				.insertInto('toDoTagMap')
				.values(toDoTagPair)
				.execute();
		}
	}
}