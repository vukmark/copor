import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {FilterListHelper} from '@copor/core/client/Core/Helpers/FilterListHelper';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class ContractTypeFilterListHelper {
	public static getContractTypeFilterList(): SetFilterDTO[] {
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