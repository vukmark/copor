import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';
import {SelectQueryBuilder} from 'kysely';
import {DB} from '@copor/core/client/types/db';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {db} from '@copor/core/client/AppDataSource';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class KyselyGetContentItemListInteractorRepo
implements ListItems<GetContentItemDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetContentItemDTO[]> {
		const actorId = input.actorId!;

		const role = await RoleKyselyHelper.getRoleForUser(actorId);

		if (!role) {
			throw new Error(`Can't get role for this id: ${actorId}`);
		}

		let pagesAndArticlesQuery = this.getContentItemPagesAndArticles();

		const newsQuery = this.getContentItemNews(role.id, role.type === RoleType.ADMIN);

		pagesAndArticlesQuery = this.applyFilters(input.filters, pagesAndArticlesQuery, input.limit, input.offset);

		const [newsResults, pagesAndArticlesResults, termsAndConditions] = await Promise.all([
			newsQuery.execute(),
			pagesAndArticlesQuery.execute(),
			this.getTermsAndConditions()
		]);

		const contentItemMap = new Map<string, GetContentItemDTO>();

		for (const row of newsResults) {
			let contentItem = contentItemMap.get(row.id);

			if (!contentItem) {
				contentItem = {
					id: row.id,
					title: row.title,
					summary: row.summary,
					content: row.content,
					publishDate: row.contentItemPublishDate,
					publishStatus: row.publishStatus,
					contentType: row.contentType,
					role: []
				};

				contentItemMap.set(row.id, contentItem);
			}

			if (contentItem.role && row.roleId && row.roleName && row.roleType) {
				contentItem.role.push({
					id: row.roleId,
					name: row.roleName,
					type: row.roleType
				});
			}
		}

		for (const row of pagesAndArticlesResults) {
			if (!contentItemMap.has(row.id)) {
				contentItemMap.set(row.id, {
					id: row.id,
					title: row.title,
					summary: row.summary,
					content: row.content,
					publishDate: row.contentItemPublishDate,
					publishStatus: row.publishStatus,
					contentType: row.contentType,
					role: undefined
				});
			}
		}

		return [
			... termsAndConditions,
			... [... contentItemMap.values()]
		];
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

	private getContentItemNews(roleId: string, isSuperAdmin: boolean = false) {
		let query = db
			.selectFrom('contentItem as ci')
			.leftJoin('contentItemRoleMap as cirm', 'ci.id', 'cirm.contentItemId')
			.leftJoin('role as r', 'r.id', 'cirm.roleId')
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
			]);

		if (!isSuperAdmin) {
			query = query.where('r.id', '=', roleId);
		}

		return query;
	}

	private getContentItemPagesAndArticles() {
		return db
			.selectFrom('contentItem as ci')
			.where('ci.contentType', 'not in', [ContentType.NEWS, ContentType.TERMS_AND_CONDITIONS])
			.select([
				'ci.id as id',
				'ci.title as title',
				'ci.summary as summary',
				'ci.content as content',
				'ci.createdAt as contentItemPublishDate',
				'ci.contentType as contentType',
				'ci.publishStatus as publishStatus'
			]);
	}

	private getTermsAndConditions(): Promise<GetContentItemDTO[]> {
		return db
			.selectFrom('contentItem as ci')
			.where('ci.contentType', '=', ContentType.TERMS_AND_CONDITIONS)
			.select([
				'ci.id as id',
				'ci.title as title',
				'ci.summary as summary',
				'ci.content as content',
				'ci.createdAt as publishDate',
				'ci.contentType as contentType',
				'ci.publishStatus as publishStatus'
			])
			.execute()
			.then((results) => results.map((row) => ({
				id: row.id,
				title: row.title,
				summary: row.summary,
				content: row.content,
				publishDate: row.publishDate,
				contentType: row.contentType,
				publishStatus: row.publishStatus,
				role: undefined
			}))
			);
	}
}