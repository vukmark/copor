import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import i18next from 'i18next';
import {DB} from '@copor/core/client/types/db';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {SelectQueryBuilder} from 'kysely';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetRoleListInteractorRepo implements ListItems<GetRoleDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetRoleDTO[]> {
		let query = db
			.selectFrom('role')
			.select(['id', 'type', 'name']);

		query = this.applyFilters(input.filters, query, input.limit, input.offset);

		let results = await query.execute();

		results = results.map((result) => {
			i18next.setDefaultNamespace('role');
			return {
				... result,
				name: i18next.t(`${result.name}`)
			};
		});

		return results;
	}
	private applyFilters(
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, 'role', QueryDTO>,
		limit?: string,
		offset?: string
	) {
		for (const filter of filterList) {
			switch (filter.name) {
				case FilterNameValues.SEARCH as string :
					dbQuery = FilterHelper.addSearchFilter(dbQuery, filter, 'name');
					break;
				case FilterNameValues.SORT_BY_NAME as string :
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, 'name');
					break;
				case FilterNameValues.ROLE as string :
					dbQuery = FilterHelper.addInFilter(dbQuery, 'type', filter.values ?? []);
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

interface QueryDTO {
	id: string;
	type: RoleType;
	name: string;
}
