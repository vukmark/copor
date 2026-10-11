import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {DB} from '@copor/core/client/types/db';
import {FilterHelper} from '@copor/core/client/Core/Helpers/FilterHelper';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {SelectQueryBuilder} from 'kysely';
import {BaseUserListInteractorRepo} from '@copor/core/client/User/helper/BaseUserListInteractorRepo';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';


const AI_CONTEXT_ITEM_SEARCH_FIELDS = [
	'aiContextItem.questionDe',
	'aiContextItem.answerDe',
	'aiContextItem.questionEn',
	'aiContextItem.answerEn'
];

export class KyselyGetAiContextItemListInteractorRepo
	extends BaseUserListInteractorRepo<GetAiContextItemDTO>
	implements ListItems<GetAiContextItemDTO> {
	constructor(appContext: AppContext) {
		super(appContext);
	}

	public async list(input: ListRepoInputDTO): Promise<GetAiContextItemDTO[]> {
		let query = db
			.selectFrom('aiContextItem')
			.select([
				'id',
				'questionDe',
				'answerDe',
				'questionEn',
				'answerEn'
			]);

		for (const filter of input.filters) {
			if (filter.name === FilterNameValues.SEARCH) {
				query = this.applyMultiTokenSearchFilter(query, filter, AI_CONTEXT_ITEM_SEARCH_FIELDS);
			}
		}

		query = this.applyFilters(input.filters, query, input.limit, input.offset);

		const results = await query.execute();

		return results.map((result) => ({... result}));
	}

	protected applyScope<T extends SelectQueryBuilder<DB, any, any>>(
		query: T,
		scope: PermissionScope,
		actorId: string,
		ids?: string[]
	): T {
		return query;
	}

	private applyFilters(
		filterList: GetFilterDTO[],
		dbQuery: SelectQueryBuilder<DB, 'aiContextItem', QueryDTO>,
		limit?: string,
		offset?: string) {
		let hasSort = false;

		for (const filter of filterList) {
			switch (filter.name) {
				case FilterNameValues.SORT_BY_NAME as string :
					hasSort = true;
					dbQuery = FilterHelper.addSortFilter(dbQuery, filter, 'questionDe');
					break;
			}
		}
		if (!hasSort) {
			dbQuery = dbQuery.orderBy('questionDe', 'asc');
		}
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
	questionDe: string;
	answerDe: string;
	questionEn: string;
	answerEn: string;
}