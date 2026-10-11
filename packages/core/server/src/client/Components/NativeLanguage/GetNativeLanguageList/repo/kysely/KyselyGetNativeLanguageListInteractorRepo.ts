import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {db} from '@copor/core/client/AppDataSource';
import {DB} from '@copor/core/client/types/db';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {SelectQueryBuilder} from 'kysely';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetNativeLanguageListInteractorRepo implements ListItems<GetNativeLanguageDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetNativeLanguageDTO[]> {
		let query = db
			.selectFrom('nativeLanguage')
			.select([
				'id',
				'name',
				'code',
				'nativeName',
				'publishStatus'
			] as const);

		query = this.applyFilters(input.filters, query, input.limit, input.offset);
		const results = await query.execute();

		return results.map((result) => ({
			... result
		}));
	}
	private applyFilters (
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, 'nativeLanguage', GetNativeLanguageDTO>,
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
				case FilterNameValues.PUBLISH_STATUS as string :
					dbQuery = FilterHelper.addInFilter(dbQuery, 'publishStatus', filter.values!);
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
