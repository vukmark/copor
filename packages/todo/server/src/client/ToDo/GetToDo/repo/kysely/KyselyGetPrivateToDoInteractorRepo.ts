import {GetPrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/GetPrivateToDoDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetPrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/GetPrivateToDoRepo';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {ToDoKyselyHelper} from '@copor/todo/client/ToDo/repositoryHelper/ToDoKyselyHelper';

export class KyselyGetPrivateToDoInteractorRepo
	extends TimeTransformer
	implements GetPrivateToDoRepo {
	async load(id: string): Promise<GetPrivateToDoDTO> {
		const row = await db
			.selectFrom('privateToDo')
			.select([
				'id',
				'title',
				'priority',
				'isDisplayedInCalendar',
				'progress',
				'deadline',
				'scheduledTime',
				'isPinned'
			])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!row) {
			throw new Error(`ToDo with id ${id} not found`);
		}

		const convertedDeadLineDate = row.deadline ? this.fromUtc(row.deadline) : undefined;

		const tags = await db
			.selectFrom('toDoTagMap as map')
			.innerJoin('tag as tag', 'map.tagId', 'tag.id')
			.select([
				'map.tagId',
				'tag.name as tagName',
				'tag.isPrivate',
				'tag.color',
				'tag.colorSet'
			])
			.where('map.toDoId', '=', id)
			.execute();

		const attachmentList = await ToDoKyselyHelper.getAttachmentListForToDo(id);

		return {
			id: row.id,
			title: row.title,
			tagList: tags.map((tag) => ({
				id: tag.tagId,
				isPrivate: Boolean(tag.isPrivate),
				color: tag.color,
				colorSet: tag.colorSet,
				name: tag.tagName
			})),
			priority: row.priority as Priority,
			isDisplayedInCalendar: Boolean(row.isDisplayedInCalendar),
			progress: row.progress as Progress ?? undefined,
			deadline: convertedDeadLineDate,
			isPinned: Boolean(row.isPinned),
			attachmentList
		};
	}
}
