import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {DueDateFilterValues} from '@copor/core/domain/Core/enum/DueDateFilterValues';
import {PriorityFilterValues} from '@copor/core/domain/Core/enum/PriorityFilterValues';
import {ProgressFilterValues} from '@copor/core/domain/Core/enum/ProgressFilterValues';
import {FilterListHelper} from '@copor/core/client/Core/Helpers/FilterListHelper';
import {db} from '@copor/core/client/AppDataSource';

export class ToDoFilterListHelper {
	public static async getToDoFilterList(actorId: string): Promise<SetFilterDTO[]> {
		// Public tags and the actor's own private ones.
		const tagList = await db
			.selectFrom('tag')
			.select(['id', 'name'])
			.where((eb) => eb.or([
				eb('isPrivate', '=', false),
				eb('isPrivate', 'is', null),
				eb.and([
					eb('isPrivate', '=', true),
					eb('actorId', '=', actorId)
				])
			])
			)
			.orderBy('isPrivate', 'desc')
			.execute();

		return [
			{
				name: FilterListHelper.getFilterName(FilterNameValues.DUE_DATE),
				type: FilterType.IN,
				values: FilterListHelper.enumToFilterNameArray(DueDateFilterValues)
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.PRIORITY),
				type: FilterType.IN,
				values: FilterListHelper.enumToFilterNameArray(PriorityFilterValues)
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.PROGRESS),
				type: FilterType.IN,
				values: FilterListHelper.enumToFilterNameArray(ProgressFilterValues)
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SEARCH),
				type: FilterType.SEARCH
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.TAG),
				type: FilterType.IN,
				values: tagList.map((tag) => {
					return {
						translation: tag.name,
						value: tag.id
					};
				})
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_TITLE),
				type: FilterType.SORT
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_PRIORITY),
				type: FilterType.SORT
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_PROGRESS),
				type: FilterType.SORT
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_DUE_DATE),
				type: FilterType.SORT
			}
		];
	}
}