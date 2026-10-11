import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {FilterListHelper} from '@copor/core/client/Core/Helpers/FilterListHelper';

export class CountryFilterListHelper {
	public static getCountryFilterList(): SetFilterDTO[] {
		return [
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SEARCH),
				type: FilterType.SEARCH
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_NAME),
				type: FilterType.SORT
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.PUBLISH_STATUS),
				type: FilterType.IN,
				values: FilterListHelper.enumToFilterNameArray(PublishStatus)
			}
		];
	}
}