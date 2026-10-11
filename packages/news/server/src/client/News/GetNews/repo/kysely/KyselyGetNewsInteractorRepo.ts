import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetNewsInteractorRepo implements GetItem<GetNewsDTO> {
	async load(id: string): Promise<GetNewsDTO> {
		const result = await db
			.selectFrom('news as n')
			.leftJoin('newsRoleMap as nrm', 'n.id', 'nrm.newsId')
			.leftJoin('role as r', 'nrm.roleId', 'r.id')
			.where('n.id', '=', id)
			.select([
				'n.id as newsId',
				'n.title as newsTitle',
				'n.summary as newsSummary',
				'n.content as newsContent',
				'n.createdAt as newsPublishDate',
				'n.publishStatus as newsPublishStatus',
				'r.id as roleId',
				'r.name as roleName',
				'r.type as roleType'
			]
			)
			.execute();

		if (result.length === 0) {
			throw new Error(`News with id ${id} not found`);
		}

		const news = result[0];

		return {
			id: news.newsId,
			title: news.newsTitle,
			summary: news.newsSummary,
			content: news.newsContent,
			publishDate: news.newsPublishDate,
			publishStatus: news.newsPublishStatus,
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