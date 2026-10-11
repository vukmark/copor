import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {DB} from '@copor/core/client/types/db';
import {SelectQueryBuilder} from 'kysely';

interface QueryDTO {
	id: string;
	name: string;
	code: string;
	countryId: string | null;
	publishStatus: PublishStatus;
}

function buildBaseQuery() {
	return db
		.selectFrom('state as s')
		.select([
			's.id as id',
			's.name as name',
			's.code as code',
			's.countryId as countryId',
			's.publishStatus as publishStatus'
		]);
}

export class KyselyGetStateTableListInteractorRepo implements ListItems<GetStateDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetStateDTO[]> {
		const query = buildBaseQuery();
		const filtered = this.applyFilters(
			input.filters,
			query as unknown as SelectQueryBuilder<DB, 'state', QueryDTO>
		);
		const results = await filtered.execute() as unknown as QueryDTO[];

		if (input.limit && input.offset) {
			const parsedLimit = parseInt(input.limit, 10);
			const parsedOffset = parseInt(input.offset, 10);

			return results.slice(parsedOffset, parsedOffset + parsedLimit).map((r) => ({... r, countryId: r.countryId!}));
		}

		return results.map((r) => ({... r, countryId: r.countryId!}));
	}

	protected applyFilters(
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, 'state', QueryDTO>

	): SelectQueryBuilder<DB, 'state', QueryDTO> {
		let hasSort = false;

		for (const filter of filterList) {
			switch (filter.name as FilterNameValues) {
				case FilterNameValues.SEARCH :
					dbQuery = FilterHelper.addSearchFilter(dbQuery, filter, 'name');
					break;
				case FilterNameValues.SORT_BY_NAME :
					hasSort = true;
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, 'name');
					break;
			}
		}
		if (!hasSort) {
			dbQuery = dbQuery.orderBy('name', 'asc');
		}
		return dbQuery;
	}
}
