import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {db} from '@copor/core/client/AppDataSource';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';

export class KyselyGetNewsInteractorRepo
implements GetItem<GetContentItemDTO> {
	async load(id: string): Promise<GetContentItemDTO> {
		const result = await db
			.selectFrom('contentItem as ci')
			.leftJoin('contentItemRoleMap as cirm', 'ci.id', 'cirm.contentItemId')
			.leftJoin('role as r', 'cirm.roleId', 'r.id')
			.where('ci.id', '=', id)
			.where('ci.contentType', '=', ContentType.NEWS)
			.select([
				'ci.id as id',
				'ci.title as title',
				'ci.summary as summary',
				'ci.content as content',
				'ci.createdAt as contentItemPublishDate',
				'ci.contentType as contentType',
				'ci.publishStatus as publishStatus',

				'r.id as roleId',
				'r.name as roleName',
				'r.type as roleType'
			])
			.execute();

		if (result.length === 0) {
			throw new Error(`News with id: ${id} not found`);
		}

		const news = result[0];

		return {
			id: news.id,
			title: news.title,
			summary: news.summary,
			content: news.content,
			contentType: news.contentType,
			publishDate: news.contentItemPublishDate,
			publishStatus: news.publishStatus,
			role: result
				.filter((row) => row.roleId)
				.map((row) => ({
					id: row.roleId!,
					name: row.roleName!,
					type: row.roleType!
				}))
		};
	}
}