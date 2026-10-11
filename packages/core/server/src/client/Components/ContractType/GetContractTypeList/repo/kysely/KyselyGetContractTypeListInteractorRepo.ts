import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {DB} from '@copor/core/client/types/db';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {SelectQueryBuilder} from 'kysely';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetContractTypeListInteractorRepo implements ListItems<GetContractTypeDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetContractTypeDTO[]> {
		let query = db
			.selectFrom('contractType')
			.select(['id', 'name', 'description', 'file', 'publishStatus']);

		query = this.applyFilters(input.filters, query, input.limit, input.offset);

		const results = await query.execute();

		return results.map((result) => ({
			... result,
			description: result.description ?? undefined
		}));
	}

	private applyFilters (
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, 'contractType', QueryDTO>,
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
interface QueryDTO {
	id: string;
	name: string;
	file: string;
	description: string | null;
	publishStatus: PublishStatus;
}