import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {DB} from '@copor/core/client/types/db';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {SelectQueryBuilder} from 'kysely';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetPublicTagListInteractorRepo implements ListItems<GetTagDTO> {
	async list(input: ListRepoInputDTO): Promise<GetTagDTO[]> {
		let query = db
			.selectFrom('tag')
			.select(['id', 'name', 'color', 'colorSet', 'description', 'isPrivate'])
			.where('isPrivate', '=', false) as SelectQueryBuilder<DB, 'tag', GetTagDTO>;

		query = this.applyFilters(input.filters, query, input.limit, input.offset);

		const tags = await query.execute();

		return tags.map((tag) => ({
			id: tag.id,
			name: tag.name,
			color: tag.color,
			colorSet: tag.colorSet,
			description: tag.description,
			isPrivate: tag.isPrivate
		}));
	}
	private applyFilters (
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, 'tag', GetTagDTO>,
		limit?: string, offset?: string
	) {
		for (const filter of filterList) {
			switch (filter.name) {
				case FilterNameValues.SEARCH as string :
					dbQuery = FilterHelper.addSearchFilter(dbQuery, filter, 'name');
					break;
				case FilterNameValues.SORT_BY_NAME as string :
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, 'name');
					break;
			}
		}
		dbQuery = dbQuery.orderBy('name', 'asc');
		if (limit && offset) {
			const parsedLimit = parseInt(limit, 10);
			const parsedOffset = parseInt(offset, 10);

			dbQuery = dbQuery.limit(parsedLimit).offset(parsedOffset);
		}

		return dbQuery;
	}
}
