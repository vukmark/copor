import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetContentItemWithoutRoleListInteractorRepo
implements GetItem<GetContentItemDTO> {
	async load(id: string): Promise<GetContentItemDTO> {
		const result = await db
			.selectFrom('contentItem as ci')
			.where('ci.id', '=', id)
			.select([
				'ci.id as id',
				'ci.title as title',
				'ci.summary as summary',
				'ci.content as content',
				'ci.createdAt as contentItemPublishDate',
				'ci.contentType as contentType',
				'ci.publishStatus as publishStatus'
			])
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Content item with id ${id} not found`);
		}

		return {
			id: result.id,
			title: result.title,
			summary: result.summary,
			content: result.content,
			publishDate: result.contentItemPublishDate,
			contentType: result.contentType,
			publishStatus: result.publishStatus,
			role: undefined
		};
	}
}