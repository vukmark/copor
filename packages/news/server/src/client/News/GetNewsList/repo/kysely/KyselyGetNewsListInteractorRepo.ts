import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {db} from '@copor/core/client/AppDataSource';
import {DB} from '@copor/core/client/types/db';
import {SelectQueryBuilder} from 'kysely';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';

export class KyselyGetNewsListInteractorRepo implements ListItems<GetNewsDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetNewsDTO[]> {
		const actorId = input.actorId ?? '';

		const role = await RoleKyselyHelper.getRoleForUser(actorId);
		const roleId = role?.id ?? '';

		// let query
		// 	= role?.type === RoleType.ADMIN
		// 		? this.getAllNews()
		// 		: this.getNewsByRole(roleId);
		let query = this.getNewsByRole(roleId);


		query = this.applyFilters(input.filters, query, input.limit, input.offset);
		const results = await query.execute();

		const newsMap = new Map<string, GetNewsDTO>();

		for (const row of results) {
			let news = newsMap.get(row.id);

			if (!news) {
				news = {
					id: row.id,
					title: row.title,
					summary: row.summary,
					content: row.content,
					publishDate: row.publishDate,
					publishStatus: row.publishStatus,
					role: []
				};

				newsMap.set(row.id, news);
			}

			if (row.roleId && row.roleName && row.roleType) {
				news.role.push({
					id: row.roleId,
					name: row.roleName,
					type: row.roleType
				});
			}
		}

		return [... newsMap.values()];
	}

	private applyFilters<T extends SelectQueryBuilder<DB, any, any>>(
		filterList: GetFilterDTO[],
		dbQuery: T,
		limit?: string,
		offset?: string
	): T {
		let hasSortFilter = false;

		for (const filter of filterList) {
			switch (filter.name) {
				case FilterNameValues.SEARCH as string :
					dbQuery = FilterHelper.addSearchFilter(dbQuery, filter, 'title') as T;
					break;
				case FilterNameValues.SORT_BY_NAME as string :
					const direction = filter.values?.[0] === 'desc' ? 'desc' : 'asc';

					dbQuery = dbQuery.orderBy('title', direction) as T;
					hasSortFilter = true;
					break;
				default :
					console.log('No match for:', filter.name);
			}
		}

		if (!hasSortFilter) {
			dbQuery = dbQuery.orderBy('title', 'asc') as T;
		}

		if (limit && offset) {
			const parsedLimit = parseInt(limit, 10);
			const parsedOffset = parseInt(offset, 10);

			dbQuery = dbQuery.limit(parsedLimit).offset(parsedOffset) as T;
		}

		return dbQuery;
	}

	// private getAllNews() {
	// 	return db
	// 		.selectFrom('news as n')
	// 		.leftJoin('newsRoleMap as nrm', 'n.id', 'nrm.newsId')
	// 		.leftJoin('role as r', 'r.id', 'nrm.roleId')
	// 		.select([
	// 			'n.id as id',
	// 			'n.title as title',
	// 			'n.summary as summary',
	// 			'n.content as content',
	// 			'n.createdAt as publishDate',
	// 			'r.id as roleId',
	// 			'r.name as roleName',
	// 			'r.type as roleType',
	// 			'n.publishStatus as publishStatus'
	// 		]);
	// }

	private getNewsByRole(roleId: string) {
		return db
			.selectFrom('news as n')
			.innerJoin('newsRoleMap as nrm', 'n.id', 'nrm.newsId')
			.innerJoin('role as r', 'r.id', 'nrm.roleId')
			.where('nrm.roleId', '=', roleId)
			.select([
				'n.id as id',
				'n.title as title',
				'n.summary as summary',
				'n.content as content',
				'n.createdAt as publishDate',
				'r.id as roleId',
				'r.name as roleName',
				'r.type as roleType',
				'n.publishStatus as publishStatus'
			]);
	}
}