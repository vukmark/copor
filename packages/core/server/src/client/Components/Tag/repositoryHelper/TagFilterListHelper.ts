import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {FilterListHelper} from '@copor/core/client/Core/Helpers/FilterListHelper';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';

export class TagFilterListHelper {
	public static getTagFilterList(): SetFilterDTO[] {
		return [
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SEARCH),
				type: FilterType.SEARCH
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_NAME),
				type: FilterType.SORT
			}
		];
	}
}